const { body, param, query, validationResult } = require('express-validator');
const { sendErrorResponse } = require('./errorHandler');

// Handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach(error => {
      formattedErrors[error.path] = error.msg;
    });
    
    return sendErrorResponse(res, 400, 'Validation failed', formattedErrors);
  }
  
  next();
};

// User registration validation
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
    
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid Indian phone number'),
    
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
    
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
  body('role')
    .isIn(['patient', 'doctor', 'pharmacy', 'delivery', 'admin'])
    .withMessage('Invalid role specified'),
    
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or phone number is required'),
    
  body('password')
    .optional()
    .notEmpty()
    .withMessage('Password is required for non-OTP login'),
    
  body('role')
    .isIn(['patient', 'doctor', 'pharmacy', 'delivery', 'admin'])
    .withMessage('Invalid role specified'),
    
  handleValidationErrors
];

// OTP validation
const validateOTP = [
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid Indian phone number'),
    
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be a 6-digit number'),
    
  handleValidationErrors
];

// Medicine validation
const validateMedicine = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Medicine name must be between 2 and 100 characters'),
    
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand name is required'),
    
  body('category')
    .isIn([
      'antibiotics', 'painkillers', 'vitamins', 'supplements',
      'diabetes', 'hypertension', 'cardiac', 'respiratory',
      'digestive', 'neurological', 'dermatology', 'gynecology',
      'pediatric', 'orthopedic', 'ophthalmology', 'ent',
      'emergency', 'ayurvedic', 'homeopathic', 'other'
    ])
    .withMessage('Invalid medicine category'),
    
  body('form')
    .isIn(['tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment', 'drops', 'inhaler', 'powder', 'other'])
    .withMessage('Invalid medicine form'),
    
  body('strength')
    .trim()
    .notEmpty()
    .withMessage('Medicine strength is required'),
    
  body('mrp')
    .isFloat({ min: 0 })
    .withMessage('MRP must be a positive number'),
    
  body('expiryDate')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
    
  handleValidationErrors
];

// Order validation
const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
    
  body('items.*.medicine')
    .isMongoId()
    .withMessage('Invalid medicine ID'),
    
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
    
  body('deliveryAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
    
  body('deliveryAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
    
  body('deliveryAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
    
  body('deliveryAddress.pincode')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Please enter a valid pincode'),
    
  body('paymentMethod')
    .isIn(['cod', 'online', 'upi', 'card', 'wallet'])
    .withMessage('Invalid payment method'),
    
  handleValidationErrors
];

// Prescription validation
const validatePrescription = [
  body('patient')
    .optional()
    .isMongoId()
    .withMessage('Invalid patient ID'),
    
  body('doctor')
    .optional()
    .isMongoId()
    .withMessage('Invalid doctor ID'),
    
  handleValidationErrors
];

// Address validation
const validateAddress = [
  body('type')
    .isIn(['home', 'work', 'other'])
    .withMessage('Invalid address type'),
    
  body('street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
    
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
    
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
    
  body('pincode')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Please enter a valid pincode'),
    
  handleValidationErrors
];

// Doctor profile validation
const validateDoctorProfile = [
  body('doctorInfo.specialization')
    .trim()
    .notEmpty()
    .withMessage('Specialization is required'),
    
  body('doctorInfo.licenseNumber')
    .trim()
    .notEmpty()
    .withMessage('License number is required'),
    
  body('doctorInfo.experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
    
  body('doctorInfo.qualification')
    .trim()
    .notEmpty()
    .withMessage('Qualification is required'),
    
  body('doctorInfo.consultationFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Consultation fee must be a positive number'),
    
  handleValidationErrors
];

// Pharmacy profile validation
const validatePharmacyProfile = [
  body('pharmacyInfo.pharmacyName')
    .trim()
    .notEmpty()
    .withMessage('Pharmacy name is required'),
    
  body('pharmacyInfo.licenseNumber')
    .trim()
    .notEmpty()
    .withMessage('License number is required'),
    
  body('pharmacyInfo.gstNumber')
    .optional()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
    .withMessage('Please enter a valid GST number'),
    
  body('pharmacyInfo.ownerName')
    .trim()
    .notEmpty()
    .withMessage('Owner name is required'),
    
  handleValidationErrors
];

// Delivery partner profile validation
const validateDeliveryProfile = [
  body('deliveryInfo.vehicleType')
    .isIn(['bicycle', 'motorcycle', 'car', 'van'])
    .withMessage('Invalid vehicle type'),
    
  body('deliveryInfo.vehicleNumber')
    .trim()
    .notEmpty()
    .withMessage('Vehicle number is required'),
    
  body('deliveryInfo.licenseNumber')
    .trim()
    .notEmpty()
    .withMessage('License number is required'),
    
  body('deliveryInfo.aadharNumber')
    .matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/)
    .withMessage('Please enter a valid Aadhar number'),
    
  handleValidationErrors
];

// Search validation
const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
    
  query('category')
    .optional()
    .isIn([
      'antibiotics', 'painkillers', 'vitamins', 'supplements',
      'diabetes', 'hypertension', 'cardiac', 'respiratory',
      'digestive', 'neurological', 'dermatology', 'gynecology',
      'pediatric', 'orthopedic', 'ophthalmology', 'ent',
      'emergency', 'ayurvedic', 'homeopathic', 'other'
    ])
    .withMessage('Invalid category'),
    
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
    
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
    
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  handleValidationErrors
];

// ID parameter validation
const validateMongoId = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName}`),
    
  handleValidationErrors
];

// File upload validation
const validateFileUpload = (req, res, next) => {
  if (!req.file && !req.files) {
    return sendErrorResponse(res, 400, 'No file uploaded');
  }
  
  // Check file type for prescription images
  if (req.file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return sendErrorResponse(res, 400, 'Invalid file type. Only JPEG, PNG, and PDF files are allowed');
    }
  }
  
  next();
};

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
    
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'name', 'price', 'rating'])
    .withMessage('Invalid sort field'),
    
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
    
  handleValidationErrors
];

// Rating validation
const validateRating = [
  body('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
    
  body('review')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Review cannot exceed 500 characters'),
    
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateOTP,
  validateMedicine,
  validateOrder,
  validatePrescription,
  validateAddress,
  validateDoctorProfile,
  validatePharmacyProfile,
  validateDeliveryProfile,
  validateSearch,
  validateMongoId,
  validateFileUpload,
  validatePagination,
  validateRating
};
