const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      message,
      statusCode: 404
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    
    // Extract field name from error
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    // Customize message based on field
    switch (field) {
      case 'email':
        message = 'Email address is already registered';
        break;
      case 'phone':
        message = 'Phone number is already registered';
        break;
      case 'orderNumber':
        message = 'Order number already exists';
        break;
      case 'prescriptionNumber':
        message = 'Prescription number already exists';
        break;
      default:
        message = `${field} '${value}' already exists`;
    }
    
    error = {
      message,
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please login again.';
    error = {
      message,
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired. Please login again.';
    error = {
      message,
      statusCode: 401
    };
  }

  // File upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File size too large. Maximum size allowed is 10MB.';
    error = {
      message,
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Too many files uploaded or unexpected field name.';
    error = {
      message,
      statusCode: 400
    };
  }

  // Payment errors
  if (err.code === 'PAYMENT_FAILED') {
    const message = 'Payment processing failed. Please try again.';
    error = {
      message,
      statusCode: 400
    };
  }

  // External API errors
  if (err.code === 'EXTERNAL_API_ERROR') {
    const message = 'External service temporarily unavailable. Please try again later.';
    error = {
      message,
      statusCode: 503
    };
  }

  // OCR processing errors
  if (err.code === 'OCR_PROCESSING_ERROR') {
    const message = 'Unable to process prescription image. Please ensure image is clear and try again.';
    error = {
      message,
      statusCode: 400
    };
  }

  // SMS/OTP errors
  if (err.code === 'SMS_SEND_ERROR') {
    const message = 'Unable to send SMS. Please check your phone number and try again.';
    error = {
      message,
      statusCode: 400
    };
  }

  // Database connection errors
  if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
    const message = 'Database connection error. Please try again later.';
    error = {
      message,
      statusCode: 503
    };
  }

  // Rate limiting errors
  if (err.statusCode === 429) {
    const message = 'Too many requests. Please try again later.';
    error = {
      message,
      statusCode: 429
    };
  }

  // Default server error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      error: err,
      stack: err.stack
    })
  });
};

// Handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error response helper
const sendErrorResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(data && { data })
  });
};

// Success response helper
const sendSuccessResponse = (res, statusCode = 200, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data })
  });
};

// Validation error helper
const handleValidationError = (errors) => {
  const formattedErrors = {};
  
  if (Array.isArray(errors)) {
    errors.forEach(error => {
      if (error.path) {
        formattedErrors[error.path] = error.message;
      }
    });
  } else if (typeof errors === 'object') {
    Object.keys(errors).forEach(key => {
      formattedErrors[key] = errors[key].message || errors[key];
    });
  }
  
  return formattedErrors;
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

module.exports = {
  errorHandler,
  asyncHandler,
  CustomError,
  sendErrorResponse,
  sendSuccessResponse,
  handleValidationError,
  notFound
};
