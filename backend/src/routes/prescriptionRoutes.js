const express = require('express');
const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Routes
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Prescription routes working!',
    timestamp: new Date().toISOString()
  });
});

// Upload prescription
router.post('/upload', protect, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Prescription upload endpoint - coming soon!',
    data: req.body
  });
});

// Get user prescriptions
router.get('/', protect, (req, res) => {
  res.json({ 
    success: true, 
    message: 'User prescriptions endpoint',
    data: []
  });
});

module.exports = router;
