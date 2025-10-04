const express = require('express');
const router = express.Router();

// Import controllers (will be created)
// const authController = require('../controllers/authController');

// Import middleware
const { validateUserRegistration, validateUserLogin, validateOTP } = require('../middleware/validation');
const { protect, sensitiveOperationLimit } = require('../middleware/auth');

// Routes
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth routes working!',
    timestamp: new Date().toISOString()
  });
});

// User Registration
router.post('/register', validateUserRegistration, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Registration endpoint - coming soon!',
    data: req.body
  });
});

// User Login
router.post('/login', validateUserLogin, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login endpoint - coming soon!',
    data: req.body
  });
});

// Send OTP
router.post('/send-otp', validateOTP, sensitiveOperationLimit(3), (req, res) => {
  res.json({ 
    success: true, 
    message: 'OTP sent successfully!',
    data: { phone: req.body.phone }
  });
});

// Verify OTP
router.post('/verify-otp', validateOTP, (req, res) => {
  res.json({ 
    success: true, 
    message: 'OTP verification endpoint - coming soon!',
    data: req.body
  });
});

// Logout
router.post('/logout', protect, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Logout successful!',
    user: req.user.name
  });
});

// Get current user
router.get('/me', protect, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Current user data',
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role
    }
  });
});

module.exports = router;
