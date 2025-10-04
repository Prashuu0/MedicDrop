const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Medicine name is required'],
    trim: true,
    maxlength: [100, 'Medicine name cannot exceed 100 characters']
  },
  genericName: {
    type: String,
    trim: true,
    maxlength: [100, 'Generic name cannot exceed 100 characters']
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  
  // Medicine Details
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'antibiotics', 'painkillers', 'vitamins', 'supplements',
      'diabetes', 'hypertension', 'cardiac', 'respiratory',
      'digestive', 'neurological', 'dermatology', 'gynecology',
      'pediatric', 'orthopedic', 'ophthalmology', 'ent',
      'emergency', 'ayurvedic', 'homeopathic', 'other'
    ]
  },
  
  // Prescription Requirements
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  scheduleType: {
    type: String,
    enum: ['H', 'H1', 'X', 'G', 'OTC'], // H=Prescription, OTC=Over the counter
    default: 'OTC'
  },
  
  // Physical Properties
  form: {
    type: String,
    required: [true, 'Medicine form is required'],
    enum: ['tablet', 'capsule', 'syrup', 'injection', 'cream', 'ointment', 'drops', 'inhaler', 'powder', 'other']
  },
  strength: {
    type: String,
    required: [true, 'Medicine strength is required']
  },
  packSize: {
    type: String,
    required: [true, 'Pack size is required']
  },
  
  // Composition
  composition: [{
    ingredient: {
      type: String,
      required: true
    },
    strength: String,
    unit: String
  }],
  
  // Usage Information
  indications: [String], // What it's used for
  contraindications: [String], // When not to use
  sideEffects: [String],
  dosageInstructions: {
    adults: String,
    children: String,
    elderly: String,
    special: String
  },
  
  // Storage & Handling
  storageConditions: {
    temperature: String,
    humidity: String,
    lightSensitive: {
      type: Boolean,
      default: false
    },
    specialInstructions: String
  },
  
  // Regulatory Information
  manufacturerInfo: {
    name: {
      type: String,
      required: [true, 'Manufacturer name is required']
    },
    address: String,
    licenseNumber: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  
  // Dates & Expiry
  manufacturingDate: Date,
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  shelfLife: String, // e.g., "24 months"
  
  // Pricing
  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: [0, 'MRP cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required']
  },
  
  // Inventory Management
  inventory: [{
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative']
    },
    batchNumber: String,
    expiryDate: Date,
    costPrice: Number,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Images & Documents
  images: [{
    public_id: String,
    url: String,
    alt: String
  }],
  
  // Regulatory Approvals
  approvals: {
    fda: {
      approved: {
        type: Boolean,
        default: false
      },
      approvalNumber: String,
      approvalDate: Date
    },
    cdsco: {
      approved: {
        type: Boolean,
        default: false
      },
      approvalNumber: String,
      approvalDate: Date
    }
  },
  
  // Alternative Medicines
  alternatives: [{
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine'
    },
    reason: String // cheaper, same composition, etc.
  }],
  
  // Reviews & Ratings
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // SEO & Search
  keywords: [String],
  searchTags: [String],
  
  // Status & Availability
  isActive: {
    type: Boolean,
    default: true
  },
  isDiscontinued: {
    type: Boolean,
    default: false
  },
  discontinuedReason: String,
  
  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  },
  
  // Admin Information
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  // Special Flags
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  requiresRefrigeration: {
    type: Boolean,
    default: false
  },
  isNarcotic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better search performance
medicineSchema.index({ name: 'text', genericName: 'text', brand: 'text' });
medicineSchema.index({ category: 1 });
medicineSchema.index({ prescriptionRequired: 1 });
medicineSchema.index({ 'inventory.pharmacy': 1 });
medicineSchema.index({ isActive: 1 });
medicineSchema.index({ expiryDate: 1 });
medicineSchema.index({ sellingPrice: 1 });

// Virtual for discounted price
medicineSchema.virtual('discountedPrice').get(function() {
  return this.mrp - (this.mrp * this.discount / 100);
});

// Virtual for availability status
medicineSchema.virtual('isAvailable').get(function() {
  const totalStock = this.inventory.reduce((total, inv) => {
    // Check if not expired
    if (inv.expiryDate > new Date()) {
      return total + inv.quantity;
    }
    return total;
  }, 0);
  return totalStock > 0;
});

// Virtual for total stock
medicineSchema.virtual('totalStock').get(function() {
  return this.inventory.reduce((total, inv) => {
    if (inv.expiryDate > new Date()) {
      return total + inv.quantity;
    }
    return total;
  }, 0);
});

// Pre-save middleware to calculate selling price
medicineSchema.pre('save', function(next) {
  if (this.isModified('mrp') || this.isModified('discount')) {
    this.sellingPrice = this.mrp - (this.mrp * this.discount / 100);
  }
  next();
});

// Method to check if medicine is expired
medicineSchema.methods.isExpired = function() {
  return this.expiryDate < new Date();
};

// Method to get stock for specific pharmacy
medicineSchema.methods.getPharmacyStock = function(pharmacyId) {
  const pharmacyInventory = this.inventory.find(
    inv => inv.pharmacy.toString() === pharmacyId.toString()
  );
  return pharmacyInventory ? pharmacyInventory.quantity : 0;
};

// Method to update stock
medicineSchema.methods.updateStock = function(pharmacyId, quantity, operation = 'set') {
  const inventoryIndex = this.inventory.findIndex(
    inv => inv.pharmacy.toString() === pharmacyId.toString()
  );
  
  if (inventoryIndex > -1) {
    if (operation === 'add') {
      this.inventory[inventoryIndex].quantity += quantity;
    } else if (operation === 'subtract') {
      this.inventory[inventoryIndex].quantity = Math.max(0, this.inventory[inventoryIndex].quantity - quantity);
    } else {
      this.inventory[inventoryIndex].quantity = quantity;
    }
    this.inventory[inventoryIndex].lastUpdated = new Date();
  } else {
    // Add new inventory entry
    this.inventory.push({
      pharmacy: pharmacyId,
      quantity: quantity,
      lastUpdated: new Date()
    });
  }
};

// Static method to search medicines
medicineSchema.statics.searchMedicines = function(query, filters = {}) {
  const searchQuery = {
    $and: [
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { genericName: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
          { keywords: { $in: [new RegExp(query, 'i')] } }
        ]
      },
      { isActive: true },
      { isDiscontinued: false }
    ]
  };
  
  // Apply filters
  if (filters.category) {
    searchQuery.$and.push({ category: filters.category });
  }
  
  if (filters.prescriptionRequired !== undefined) {
    searchQuery.$and.push({ prescriptionRequired: filters.prescriptionRequired });
  }
  
  if (filters.minPrice || filters.maxPrice) {
    const priceFilter = {};
    if (filters.minPrice) priceFilter.$gte = filters.minPrice;
    if (filters.maxPrice) priceFilter.$lte = filters.maxPrice;
    searchQuery.$and.push({ sellingPrice: priceFilter });
  }
  
  return this.find(searchQuery);
};

module.exports = mongoose.model('Medicine', medicineSchema);
