const express = require('express');
const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Routes
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin routes working!',
    timestamp: new Date().toISOString()
  });
});

// Get all users
router.get('/users', protect, authorize('admin'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin users endpoint',
    data: []
  });
});

// Get analytics
router.get('/analytics', protect, authorize('admin'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin analytics endpoint',
    data: {
      totalUsers: 100,
      totalOrders: 50,
      totalRevenue: 10000
    }
  });
});

module.exports = router;
