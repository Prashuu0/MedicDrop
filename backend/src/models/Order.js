const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Identification
  orderNumber: {
    type: String,
    unique: true,
    required: [true, 'Order number is required']
  },
  
  // Customer Information
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required']
  },
  
  // Order Items
  items: [{
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    finalPrice: {
      type: Number,
      required: true
    },
    prescriptionRequired: {
      type: Boolean,
      default: false
    },
    batchNumber: String,
    expiryDate: Date
  }],
  
  // Prescription Information
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  prescriptionImages: [{
    public_id: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Doctor Verification
  doctorVerification: {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'not_required'],
      default: 'not_required'
    },
    verifiedAt: Date,
    notes: String,
    suggestedAlternatives: [{
      originalMedicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
      },
      suggestedMedicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
      },
      reason: String
    }]
  },
  
  // Pharmacy Information
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Pharmacy is required']
  },
  pharmacyAcceptedAt: Date,
  pharmacyNotes: String,
  
  // Delivery Information
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliveryAddress: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid pincode']
    },
    landmark: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Order Status Tracking
  status: {
    type: String,
    enum: [
      'placed',           // Order placed by customer
      'prescription_uploaded', // Prescription uploaded (if required)
      'doctor_review',    // Under doctor review
      'doctor_approved',  // Doctor approved
      'doctor_rejected',  // Doctor rejected
      'pharmacy_review',  // Pharmacy reviewing order
      'pharmacy_accepted', // Pharmacy accepted order
      'pharmacy_rejected', // Pharmacy rejected order
      'preparing',        // Pharmacy preparing order
      'ready_for_pickup', // Ready for delivery pickup
      'picked_up',        // Picked up by delivery partner
      'out_for_delivery', // Out for delivery
      'delivered',        // Successfully delivered
      'cancelled',        // Order cancelled
      'returned',         // Order returned
      'refunded'          // Order refunded
    ],
    default: 'placed'
  },
  
  // Status History
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String,
    location: {
      latitude: Number,
      longitude: Number
    }
  }],
  
  // Pricing Information
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative']
    },
    deliveryCharges: {
      type: Number,
      default: 0,
      min: [0, 'Delivery charges cannot be negative']
    },
    taxes: {
      cgst: {
        type: Number,
        default: 0
      },
      sgst: {
        type: Number,
        default: 0
      },
      igst: {
        type: Number,
        default: 0
      }
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative']
    }
  },
  
  // Payment Information
  payment: {
    method: {
      type: String,
      enum: ['cod', 'online', 'upi', 'card', 'wallet'],
      required: [true, 'Payment method is required']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded', 'partial_refund'],
      default: 'pending'
    },
    transactionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number,
    refundReason: String
  },
  
  // Delivery Tracking
  delivery: {
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    deliveryInstructions: String,
    deliveryProof: {
      type: String, // Image URL
      uploadedAt: Date
    },
    deliveryOTP: String,
    deliveryAttempts: [{
      attemptedAt: Date,
      status: {
        type: String,
        enum: ['successful', 'failed', 'rescheduled']
      },
      reason: String,
      nextAttemptDate: Date
    }],
    trackingUpdates: [{
      timestamp: Date,
      location: {
        latitude: Number,
        longitude: Number,
        address: String
      },
      status: String,
      message: String
    }]
  },
  
  // Customer Feedback
  feedback: {
    rating: {
      overall: {
        type: Number,
        min: 1,
        max: 5
      },
      pharmacy: {
        type: Number,
        min: 1,
        max: 5
      },
      delivery: {
        type: Number,
        min: 1,
        max: 5
      }
    },
    review: String,
    reviewDate: Date
  },
  
  // Special Instructions
  specialInstructions: String,
  
  // Emergency Order
  isEmergency: {
    type: Boolean,
    default: false
  },
  emergencyReason: String,
  
  // Insurance Information
  insurance: {
    provider: String,
    policyNumber: String,
    claimAmount: Number,
    claimStatus: {
      type: String,
      enum: ['not_claimed', 'pending', 'approved', 'rejected']
    },
    claimId: String
  },
  
  // Cancellation Information
  cancellation: {
    reason: String,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cancelledAt: Date,
    refundProcessed: {
      type: Boolean,
      default: false
    }
  },
  
  // Return Information
  return: {
    reason: String,
    returnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    returnedAt: Date,
    returnStatus: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'completed']
    },
    refundAmount: Number
  },
  
  // Admin Notes
  adminNotes: String,
  
  // Scheduled Delivery
  scheduledDelivery: {
    isScheduled: {
      type: Boolean,
      default: false
    },
    scheduledDate: Date,
    scheduledTimeSlot: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1 });
orderSchema.index({ pharmacy: 1 });
orderSchema.index({ deliveryPartner: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'deliveryAddress.pincode': 1 });

// Virtual for order age
orderSchema.virtual('orderAge').get(function() {
  return Date.now() - this.createdAt;
});

// Virtual for delivery status
orderSchema.virtual('deliveryStatus').get(function() {
  if (this.status === 'delivered') return 'delivered';
  if (this.status === 'out_for_delivery') return 'in_transit';
  if (this.status === 'picked_up') return 'picked_up';
  if (this.status === 'ready_for_pickup') return 'ready';
  return 'preparing';
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `MD${Date.now()}${String(count + 1).padStart(4, '0')}`;
    
    // Add initial status to history
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      notes: 'Order placed'
    });
  }
  next();
});

// Pre-save middleware to calculate total
orderSchema.pre('save', function(next) {
  if (this.isModified('items') || this.isModified('pricing')) {
    // Calculate subtotal from items
    this.pricing.subtotal = this.items.reduce((total, item) => {
      return total + (item.finalPrice * item.quantity);
    }, 0);
    
    // Calculate total
    const taxTotal = this.pricing.taxes.cgst + this.pricing.taxes.sgst + this.pricing.taxes.igst;
    this.pricing.total = this.pricing.subtotal - this.pricing.discount + this.pricing.deliveryCharges + taxTotal;
  }
  next();
});

// Method to update order status
orderSchema.methods.updateStatus = function(newStatus, updatedBy, notes, location) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    updatedBy: updatedBy,
    notes: notes,
    location: location
  });
  
  // Update specific timestamps
  switch (newStatus) {
    case 'pharmacy_accepted':
      this.pharmacyAcceptedAt = new Date();
      break;
    case 'delivered':
      this.delivery.actualDeliveryTime = new Date();
      break;
    case 'cancelled':
      this.cancellation.cancelledAt = new Date();
      this.cancellation.cancelledBy = updatedBy;
      break;
  }
};

// Method to calculate delivery charges
orderSchema.methods.calculateDeliveryCharges = function(distance) {
  let charges = 0;
  
  if (this.isEmergency) {
    charges = 100; // Emergency delivery charges
  } else if (distance <= 5) {
    charges = 30;
  } else if (distance <= 10) {
    charges = 50;
  } else {
    charges = 80;
  }
  
  // Free delivery for orders above ₹500
  if (this.pricing.subtotal >= 500) {
    charges = 0;
  }
  
  this.pricing.deliveryCharges = charges;
  return charges;
};

// Method to generate delivery OTP
orderSchema.methods.generateDeliveryOTP = function() {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  this.delivery.deliveryOTP = otp;
  return otp;
};

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const nonCancellableStatuses = ['picked_up', 'out_for_delivery', 'delivered', 'cancelled', 'returned'];
  return !nonCancellableStatuses.includes(this.status);
};

// Static method to get orders by status
orderSchema.statics.getOrdersByStatus = function(status, limit = 10) {
  return this.find({ status })
    .populate('customer', 'name phone')
    .populate('pharmacy', 'name pharmacyInfo.pharmacyName')
    .populate('deliveryPartner', 'name phone')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get pharmacy orders
orderSchema.statics.getPharmacyOrders = function(pharmacyId, status) {
  const query = { pharmacy: pharmacyId };
  if (status) query.status = status;
  
  return this.find(query)
    .populate('customer', 'name phone')
    .populate('items.medicine', 'name brand strength')
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Order', orderSchema);
