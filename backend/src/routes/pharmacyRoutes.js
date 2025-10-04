const express = require('express');
const router = express.Router();

// Import middleware
const { protect, authorize, verifyPharmacy } = require('../middleware/auth');

// Routes
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Pharmacy routes working!',
    timestamp: new Date().toISOString()
  });
});

// Get pharmacy orders
router.get('/orders', protect, authorize('pharmacy'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Pharmacy orders endpoint',
    data: []
  });
});

// Update order status
router.put('/orders/:id', protect, authorize('pharmacy'), (req, res) => {
  res.json({ 
    success: true, 
    message: 'Order status update endpoint - coming soon!',
    data: {
      orderId: req.params.id,
      newStatus: req.body.status
    }
  });
});

module.exports = router;
