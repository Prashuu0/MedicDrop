const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  // Patient Information
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient is required']
  },
  
  // Doctor Information
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Prescription Identification
  prescriptionNumber: {
    type: String,
    unique: true
  },
  
  // Prescription Images/Files
  images: [{
    public_id: String,
    url: {
      type: String,
      required: true
    },
    originalName: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // OCR Extracted Data
  extractedData: {
    patientName: String,
    patientAge: Number,
    doctorName: String,
    hospitalName: String,
    prescriptionDate: Date,
    medicines: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
      quantity: String,
      confidence: Number // OCR confidence score
    }],
    diagnosis: String,
    symptoms: [String],
    advice: String,
    followUpDate: Date,
    ocrConfidence: Number, // Overall OCR confidence
    rawText: String // Raw extracted text
  },
  
  // Manual/Verified Data
  verifiedData: {
    medicines: [{
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
      },
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
      quantity: Number,
      isSubstitutable: {
        type: Boolean,
        default: true
      }
    }],
    diagnosis: String,
    symptoms: [String],
    advice: String,
    followUpDate: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date
  },
  
  // Prescription Status
  status: {
    type: String,
    enum: [
      'uploaded',      // Just uploaded by patient
      'processing',    // OCR processing in progress
      'ocr_completed', // OCR processing completed
      'doctor_review', // Under doctor review
      'verified',      // Verified by doctor
      'rejected',      // Rejected by doctor
      'expired',       // Prescription expired
      'used'          // Used for order
    ],
    default: 'uploaded'
  },
  
  // Validation Information
  validation: {
    isValid: {
      type: Boolean,
      default: null
    },
    validatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    validatedAt: Date,
    validationNotes: String,
    rejectionReason: String
  },
  
  // Prescription Validity
  validity: {
    issuedDate: Date,
    expiryDate: Date,
    isExpired: {
      type: Boolean,
      default: false
    }
  },
  
  // Usage Tracking
  usage: {
    timesUsed: {
      type: Number,
      default: 0
    },
    lastUsedAt: Date,
    orders: [{
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      },
      usedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  // Medical Information
  medicalInfo: {
    patientAge: Number,
    patientWeight: Number,
    bloodPressure: String,
    temperature: String,
    pulse: String,
    allergies: [String],
    chronicConditions: [String],
    currentMedications: [String]
  },
  
  // Doctor's Notes
  doctorNotes: {
    diagnosis: String,
    symptoms: [String],
    treatmentPlan: String,
    precautions: String,
    followUpInstructions: String,
    emergencyInstructions: String
  },
  
  // Pharmacy Information
  dispensedBy: {
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    pharmacist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dispensedAt: Date,
    dispensingNotes: String
  },
  
  // Digital Signature (if created digitally)
  digitalSignature: {
    doctorSignature: String,
    timestamp: Date,
    ipAddress: String,
    deviceInfo: String
  },
  
  // Prescription Type
  type: {
    type: String,
    enum: ['uploaded_image', 'digital', 'scanned'],
    default: 'uploaded_image'
  },
  
  // Emergency Prescription
  isEmergency: {
    type: Boolean,
    default: false
  },
  emergencyReason: String,
  
  // Refill Information
  refillInfo: {
    isRefillable: {
      type: Boolean,
      default: false
    },
    refillsAllowed: {
      type: Number,
      default: 0
    },
    refillsUsed: {
      type: Number,
      default: 0
    },
    lastRefillDate: Date
  },
  
  // Insurance Information
  insurance: {
    provider: String,
    policyNumber: String,
    claimable: {
      type: Boolean,
      default: false
    },
    claimAmount: Number
  },
  
  // Quality Metrics
  quality: {
    imageQuality: {
      type: String,
      enum: ['poor', 'fair', 'good', 'excellent']
    },
    readability: {
      type: String,
      enum: ['poor', 'fair', 'good', 'excellent']
    },
    completeness: {
      type: String,
      enum: ['incomplete', 'partial', 'complete']
    }
  },
  
  // Admin Information
  adminNotes: String,
  flaggedForReview: {
    type: Boolean,
    default: false
  },
  flagReason: String,
  
  // Privacy & Compliance
  consentGiven: {
    type: Boolean,
    default: true
  },
  dataRetentionDate: Date,
  
  // Audit Trail
  auditLog: [{
    action: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    details: String,
    ipAddress: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
prescriptionSchema.index({ patient: 1 });
prescriptionSchema.index({ doctor: 1 });
prescriptionSchema.index({ prescriptionNumber: 1 });
prescriptionSchema.index({ status: 1 });
prescriptionSchema.index({ createdAt: -1 });
prescriptionSchema.index({ 'validity.expiryDate': 1 });

// Virtual for prescription age
prescriptionSchema.virtual('age').get(function() {
  return Date.now() - this.createdAt;
});

// Virtual for days until expiry
prescriptionSchema.virtual('daysUntilExpiry').get(function() {
  if (!this.validity.expiryDate) return null;
  const diffTime = this.validity.expiryDate - Date.now();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to generate prescription number
prescriptionSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.prescriptionNumber = `RX${Date.now()}${String(count + 1).padStart(4, '0')}`;
    
    // Set default expiry date (30 days from issue)
    if (!this.validity.expiryDate) {
      this.validity.expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
    
    // Add audit log entry
    this.auditLog.push({
      action: 'prescription_uploaded',
      performedBy: this.patient,
      details: 'Prescription uploaded by patient'
    });
  }
  next();
});

// Pre-save middleware to check expiry
prescriptionSchema.pre('save', function(next) {
  if (this.validity.expiryDate && this.validity.expiryDate < new Date()) {
    this.validity.isExpired = true;
    if (this.status !== 'expired') {
      this.status = 'expired';
    }
  }
  next();
});

// Method to add audit log entry
prescriptionSchema.methods.addAuditLog = function(action, performedBy, details, ipAddress) {
  this.auditLog.push({
    action,
    performedBy,
    details,
    ipAddress,
    timestamp: new Date()
  });
};

// Method to verify prescription
prescriptionSchema.methods.verifyPrescription = function(doctorId, verifiedData, notes) {
  this.status = 'verified';
  this.verifiedData = verifiedData;
  this.validation = {
    isValid: true,
    validatedBy: doctorId,
    validatedAt: new Date(),
    validationNotes: notes
  };
  
  this.addAuditLog('prescription_verified', doctorId, 'Prescription verified by doctor');
};

// Method to reject prescription
prescriptionSchema.methods.rejectPrescription = function(doctorId, reason) {
  this.status = 'rejected';
  this.validation = {
    isValid: false,
    validatedBy: doctorId,
    validatedAt: new Date(),
    rejectionReason: reason
  };
  
  this.addAuditLog('prescription_rejected', doctorId, `Prescription rejected: ${reason}`);
};

// Method to use prescription for order
prescriptionSchema.methods.useForOrder = function(orderId) {
  this.usage.timesUsed += 1;
  this.usage.lastUsedAt = new Date();
  this.usage.orders.push({
    order: orderId,
    usedAt: new Date()
  });
  
  // Mark as used if single-use prescription
  if (!this.refillInfo.isRefillable) {
    this.status = 'used';
  }
  
  this.addAuditLog('prescription_used', null, `Used for order: ${orderId}`);
};

// Method to check if prescription can be used
prescriptionSchema.methods.canBeUsed = function() {
  if (this.validity.isExpired) return false;
  if (this.status === 'rejected' || this.status === 'expired') return false;
  if (this.status === 'used' && !this.refillInfo.isRefillable) return false;
  if (this.refillInfo.isRefillable && this.refillInfo.refillsUsed >= this.refillInfo.refillsAllowed) return false;
  
  return true;
};

// Method to process OCR results
prescriptionSchema.methods.processOCRResults = function(ocrData) {
  this.extractedData = ocrData;
  this.status = 'ocr_completed';
  
  // Auto-verify if confidence is high
  if (ocrData.ocrConfidence > 0.9) {
    this.status = 'verified';
    this.validation.isValid = true;
  } else {
    this.status = 'doctor_review';
  }
  
  this.addAuditLog('ocr_processed', null, `OCR completed with confidence: ${ocrData.ocrConfidence}`);
};

// Static method to get prescriptions for doctor review
prescriptionSchema.statics.getPendingReviews = function(doctorId) {
  return this.find({
    status: 'doctor_review',
    doctor: doctorId
  }).populate('patient', 'name phone patientInfo');
};

// Static method to get patient prescriptions
prescriptionSchema.statics.getPatientPrescriptions = function(patientId, limit = 10) {
  return this.find({ patient: patientId })
    .populate('doctor', 'name doctorInfo.specialization')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get expiring prescriptions
prescriptionSchema.statics.getExpiringPrescriptions = function(days = 7) {
  const expiryDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return this.find({
    'validity.expiryDate': { $lte: expiryDate },
    'validity.isExpired': false,
    status: { $in: ['verified', 'ocr_completed'] }
  }).populate('patient', 'name phone');
};

module.exports = mongoose.model('Prescription', prescriptionSchema);
