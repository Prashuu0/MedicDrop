const express = require('express');
const router = express.Router();

// Import middleware
const { protect, authorize, verifyDoctor } = require('../middleware/auth');

// Routes
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Doctor routes working!',
    timestamp: new Date().toISOString()
  });
});

// Get prescriptions for review
router.get('/prescriptions', protect, authorize('doctor'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Doctor prescriptions review endpoint',
    data: []
  });
});

// Verify prescription
router.put('/prescriptions/:id/verify', protect, authorize('doctor'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Prescription verification endpoint - coming soon!',
    data: {
      prescriptionId: req.params.id,
      status: req.body.status
    }
  });
});

module.exports = router;
