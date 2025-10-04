const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: function() {
      return this.role !== 'patient' && this.role !== 'delivery';
    },
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  password: {
    type: String,
    required: function() {
      return this.role !== 'patient' && this.role !== 'delivery';
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // Role-based Information
  role: {
    type: String,
    enum: ['patient', 'doctor', 'pharmacy', 'delivery', 'admin'],
    required: [true, 'Role is required']
  },
  
  // Profile Information
  avatar: {
    public_id: String,
    url: String
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  
  // Address Information
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    },
    street: String,
    city: String,
    state: String,
    pincode: {
      type: String,
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid pincode']
    },
    landmark: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  
  // Doctor-specific fields
  doctorInfo: {
    specialization: String,
    licenseNumber: String,
    experience: Number,
    qualification: String,
    hospitalAffiliation: String,
    consultationFee: Number,
    availability: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      startTime: String,
      endTime: String,
      isAvailable: {
        type: Boolean,
        default: true
      }
    }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  
  // Pharmacy-specific fields
  pharmacyInfo: {
    pharmacyName: String,
    licenseNumber: String,
    gstNumber: String,
    ownerName: String,
    establishedYear: Number,
    operatingHours: {
      open: String,
      close: String
    },
    services: [{
      type: String,
      enum: ['home_delivery', '24x7', 'online_consultation', 'insurance_accepted']
    }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    deliveryRadius: {
      type: Number,
      default: 10 // in kilometers
    }
  },
  
  // Delivery Partner-specific fields
  deliveryInfo: {
    vehicleType: {
      type: String,
      enum: ['bicycle', 'motorcycle', 'car', 'van']
    },
    vehicleNumber: String,
    licenseNumber: String,
    aadharNumber: String,
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String
    },
    emergencyContact: {
      name: String,
      phone: String,
      relation: String
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalDeliveries: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
      lastUpdated: Date
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  
  // Patient-specific fields
  patientInfo: {
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    allergies: [String],
    chronicConditions: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relation: String
    },
    healthId: String, // Government Health ID
    insuranceDetails: {
      provider: String,
      policyNumber: String,
      validTill: Date
    }
  },
  
  // Authentication & Security
  otp: {
    code: String,
    expiresAt: Date,
    attempts: {
      type: Number,
      default: 0
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockReason: String,
  
  // Timestamps
  lastLogin: Date,
  passwordChangedAt: Date,
  
  // Preferences
  preferences: {
    language: {
      type: String,
      enum: ['english', 'hindi'],
      default: 'english'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'addresses.pincode': 1 });
userSchema.index({ 'doctorInfo.specialization': 1 });
userSchema.index({ 'pharmacyInfo.isVerified': 1 });
userSchema.index({ 'deliveryInfo.isAvailable': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update passwordChangedAt field
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if password changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Generate OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    attempts: 0
  };
  return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function(candidateOTP) {
  if (!this.otp || !this.otp.code) return false;
  if (this.otp.expiresAt < new Date()) return false;
  if (this.otp.attempts >= 3) return false;
  
  if (this.otp.code === candidateOTP) {
    this.otp = undefined;
    return true;
  }
  
  this.otp.attempts += 1;
  return false;
};

// Get default address
userSchema.methods.getDefaultAddress = function() {
  return this.addresses.find(addr => addr.isDefault) || this.addresses[0];
};

module.exports = mongoose.model('User', userSchema);
