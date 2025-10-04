const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Protect routes - Authentication middleware
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid. User not found.'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated. Please contact support.'
        });
      }

      // Check if user is blocked
      if (user.isBlocked) {
        return res.status(401).json({
          success: false,
          message: `Account is blocked. Reason: ${user.blockReason || 'Contact support'}`
        });
      }

      // Check if password changed after token was issued
      if (user.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
          success: false,
          message: 'Password was changed recently. Please login again.'
        });
      }

      // Add user to request
      req.user = user;
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid.'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please login first.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.user.role} role is not authorized for this action.`
      });
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (user && user.isActive && !user.isBlocked) {
          req.user = user;
        }
      } catch (error) {
        // Token invalid, but continue without user
        console.log('Optional auth: Invalid token');
      }
    }

    next();
  } catch (error) {
    next();
  }
};

// Check if user owns the resource
const checkOwnership = (resourceField = 'user') => {
  return (req, res, next) => {
    // Admin can access everything
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the resource
    const resourceUserId = req.body[resourceField] || req.params[resourceField];
    
    if (resourceUserId && resourceUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }

    next();
  };
};

// Verify pharmacy for order operations
const verifyPharmacy = async (req, res, next) => {
  try {
    if (req.user.role !== 'pharmacy') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only pharmacies can perform this action.'
      });
    }

    // Check if pharmacy is verified
    if (!req.user.pharmacyInfo || !req.user.pharmacyInfo.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Pharmacy verification required. Please complete KYC process.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying pharmacy status'
    });
  }
};

// Verify doctor for prescription operations
const verifyDoctor = async (req, res, next) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only doctors can perform this action.'
      });
    }

    // Check if doctor is verified
    if (!req.user.doctorInfo || !req.user.doctorInfo.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Doctor verification required. Please complete license verification.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying doctor status'
    });
  }
};

// Verify delivery partner
const verifyDeliveryPartner = async (req, res, next) => {
  try {
    if (req.user.role !== 'delivery') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only delivery partners can perform this action.'
      });
    }

    // Check if delivery partner is verified
    if (!req.user.deliveryInfo || !req.user.deliveryInfo.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Delivery partner verification required. Please complete document verification.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying delivery partner status'
    });
  }
};

// Rate limiting for sensitive operations
const sensitiveOperationLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map();

  return (req, res, next) => {
    const key = req.ip + (req.user ? req.user._id : '');
    const now = Date.now();
    
    if (!attempts.has(key)) {
      attempts.set(key, []);
    }

    const userAttempts = attempts.get(key);
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < windowMs);
    attempts.set(key, validAttempts);

    if (validAttempts.length >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Too many attempts. Please try again later.'
      });
    }

    // Add current attempt
    validAttempts.push(now);
    next();
  };
};

// Check if user can access specific pharmacy data
const checkPharmacyAccess = async (req, res, next) => {
  try {
    const pharmacyId = req.params.pharmacyId || req.body.pharmacyId;
    
    // Admin can access all pharmacies
    if (req.user.role === 'admin') {
      return next();
    }

    // Pharmacy can only access their own data
    if (req.user.role === 'pharmacy') {
      if (req.user._id.toString() !== pharmacyId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own pharmacy data.'
        });
      }
    }

    // Delivery partners can access pharmacy data for their assigned orders
    if (req.user.role === 'delivery') {
      // This would need additional logic to check if delivery partner has orders from this pharmacy
      // For now, allow access
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking pharmacy access'
    });
  }
};

module.exports = {
  generateToken,
  protect,
  authorize,
  optionalAuth,
  checkOwnership,
  verifyPharmacy,
  verifyDoctor,
  verifyDeliveryPartner,
  sensitiveOperationLimit,
  checkPharmacyAccess
};
