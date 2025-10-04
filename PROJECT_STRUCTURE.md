# 🏗️ MedicDrop Project Structure

Complete project architecture and file organization for the MedicDrop healthcare platform.

## 📁 Root Directory Structure

```
medicdrop/
├── 📁 backend/                    # Node.js API Server
├── 📁 frontend/                   # React Frontend Application
├── 📁 src/                        # Additional source files
├── 📁 docs/                       # Documentation files
├── 📄 package.json                # Root package configuration
├── 📄 package-lock.json           # Dependency lock file
├── 📄 .gitignore                  # Git ignore rules
├── 📄 env.example                 # Environment variables template
├── 📄 README.md                   # Main project documentation
├── 📄 CONTRIBUTING.md             # Contribution guidelines
├── 📄 DEPLOYMENT.md               # Deployment guide
├── 📄 API_DOCUMENTATION.md        # API reference
├── 📄 FEATURES.md                 # Features overview
└── 📄 PROJECT_STRUCTURE.md        # This file
```

## 🖥️ Backend Structure

```
backend/
├── 📁 src/                        # Source code
│   ├── 📁 config/                 # Configuration files
│   │   ├── 📄 database.js         # Database configuration
│   │   ├── 📄 redis.js            # Redis configuration
│   │   └── 📄 cloudinary.js       # File upload configuration
│   ├── 📁 controllers/            # Route controllers
│   │   ├── 📄 authController.js   # Authentication logic
│   │   ├── 📄 userController.js   # User management
│   │   ├── 📄 orderController.js  # Order processing
│   │   ├── 📄 medicineController.js # Medicine management
│   │   ├── 📄 prescriptionController.js # Prescription handling
│   │   ├── 📄 pharmacyController.js # Pharmacy operations
│   │   ├── 📄 deliveryController.js # Delivery management
│   │   └── 📄 adminController.js  # Admin operations
│   ├── 📁 middleware/             # Custom middleware
│   │   ├── 📄 auth.js             # Authentication middleware
│   │   ├── 📄 validation.js       # Request validation
│   │   ├── 📄 errorHandler.js     # Error handling
│   │   ├── 📄 rateLimiter.js      # Rate limiting
│   │   └── 📄 upload.js           # File upload handling
│   ├── 📁 models/                 # Database models
│   │   ├── 📄 User.js             # User schema
│   │   ├── 📄 Medicine.js         # Medicine schema
│   │   ├── 📄 Order.js            # Order schema
│   │   ├── 📄 Prescription.js     # Prescription schema
│   │   ├── 📄 Pharmacy.js         # Pharmacy schema
│   │   ├── 📄 Delivery.js         # Delivery schema
│   │   └── 📄 Admin.js            # Admin schema
│   ├── 📁 routes/                 # API routes
│   │   ├── 📄 authRoutes.js       # Authentication routes
│   │   ├── 📄 userRoutes.js       # User routes
│   │   ├── 📄 orderRoutes.js      # Order routes
│   │   ├── 📄 medicineRoutes.js   # Medicine routes
│   │   ├── 📄 prescriptionRoutes.js # Prescription routes
│   │   ├── 📄 pharmacyRoutes.js   # Pharmacy routes
│   │   ├── 📄 deliveryRoutes.js   # Delivery routes
│   │   └── 📄 adminRoutes.js      # Admin routes
│   └── 📁 utils/                  # Utility functions
│       ├── 📄 emailService.js     # Email service
│       ├── 📄 smsService.js       # SMS service
│       ├── 📄 fileUpload.js       # File upload utilities
│       ├── 📄 ocrService.js       # OCR processing
│       ├── 📄 paymentService.js   # Payment processing
│       └── 📄 notificationService.js # Push notifications
├── 📁 uploads/                    # File uploads directory
├── 📁 tests/                      # Test files
│   ├── 📁 unit/                   # Unit tests
│   ├── 📁 integration/            # Integration tests
│   └── 📁 fixtures/               # Test data
├── 📄 server.js                   # Main server file
├── 📄 package.json                # Backend dependencies
├── 📄 .env                        # Environment variables
├── 📄 .env.example                # Environment template
├── 📄 README.md                   # Backend documentation
└── 📄 API_README.md               # API documentation
```

## 🎨 Frontend Structure

```
frontend/
├── 📁 public/                     # Static assets
│   ├── 📄 index.html              # Main HTML file
│   ├── 📄 favicon.ico             # Site favicon
│   ├── 📄 manifest.json           # PWA manifest
│   ├── 📄 robots.txt              # SEO robots file
│   └── 📁 images/                 # Static images
├── 📁 src/                        # Source code
│   ├── 📁 components/             # Reusable components
│   │   ├── 📁 Auth/               # Authentication components
│   │   │   ├── 📄 ProtectedRoute.tsx # Route protection
│   │   │   └── 📄 RoleBasedRoute.tsx # Role-based routing
│   │   ├── 📁 Layout/             # Layout components
│   │   │   ├── 📄 Layout.tsx      # Main layout
│   │   │   └── 📄 PublicLayout.tsx # Public pages layout
│   │   ├── 📁 ui/                 # UI components
│   │   │   ├── 📄 ActionButton.jsx # Action buttons
│   │   │   ├── 📄 StatCard.jsx    # Statistics cards
│   │   │   └── 📄 StatusBadge.jsx # Status indicators
│   │   └── 📄 PlaceholderPage.tsx # Placeholder component
│   ├── 📁 pages/                  # Page components
│   │   ├── 📁 Admin/              # Admin panel pages
│   │   │   ├── 📄 AdminDashboard.tsx # Admin dashboard
│   │   │   ├── 📄 AdminProfile.tsx # Admin profile
│   │   │   ├── 📄 OrderAnalytics.tsx # Order analytics
│   │   │   ├── 📄 PharmacyManagement.tsx # Pharmacy management
│   │   │   └── 📄 UserManagement.tsx # User management
│   │   ├── 📁 Auth/               # Authentication pages
│   │   │   ├── 📄 LoginPage.jsx   # Login page
│   │   │   ├── 📄 RegisterPage.jsx # Registration page
│   │   │   ├── 📄 UserLoginPage.jsx # User login
│   │   │   └── 📄 DoctorLoginPage.jsx # Doctor login
│   │   ├── 📁 Delivery/           # Delivery panel pages
│   │   │   ├── 📄 DeliveryDashboard.tsx # Delivery dashboard
│   │   │   ├── 📄 DeliveryOrders.tsx # Order management
│   │   │   ├── 📄 DeliveryProfile.tsx # Delivery profile
│   │   │   └── 📄 DeliveryTracking.tsx # Order tracking
│   │   ├── 📁 Doctor/             # Doctor panel pages
│   │   │   ├── 📄 DoctorDashboard.tsx # Doctor dashboard
│   │   │   ├── 📄 DoctorProfile.tsx # Doctor profile
│   │   │   ├── 📄 DigitalPrescription.jsx # Digital prescriptions
│   │   │   ├── 📄 DoctorOnboarding.jsx # Doctor onboarding
│   │   │   ├── 📄 Messages.jsx    # Doctor messages
│   │   │   ├── 📄 PatientManagement.tsx # Patient management
│   │   │   ├── 📄 PrescriptionReview.tsx # Prescription review
│   │   │   └── 📄 Reports.jsx     # Doctor reports
│   │   ├── 📁 Error/              # Error pages
│   │   │   ├── 📄 NotFoundPage.tsx # 404 page
│   │   │   └── 📄 UnauthorizedPage.tsx # 401 page
│   │   ├── 📁 Patient/            # Patient panel pages
│   │   │   ├── 📄 PatientDashboard.tsx # Patient dashboard
│   │   │   ├── 📄 PatientProfile.tsx # Patient profile
│   │   │   ├── 📄 MedicineSearch.tsx # Medicine search
│   │   │   ├── 📄 PrescriptionUpload.tsx # Prescription upload
│   │   │   ├── 📄 OrderHistory.tsx # Order history
│   │   │   └── 📄 OrderTracking.tsx # Order tracking
│   │   ├── 📁 Pharmacy/           # Pharmacy panel pages
│   │   │   ├── 📄 PharmacyDashboard.tsx # Pharmacy dashboard
│   │   │   ├── 📄 PharmacyProfile.tsx # Pharmacy profile
│   │   │   ├── 📄 OrderManagement.tsx # Order management
│   │   │   └── 📄 InventoryManagement.tsx # Inventory management
│   │   └── 📁 Public/             # Public pages
│   │       ├── 📄 HomePage.tsx    # Home page
│   │       ├── 📄 AboutPage.tsx   # About page
│   │       └── 📄 ContactPage.tsx # Contact page
│   ├── 📁 context/                # React context
│   │   ├── 📄 AuthContext.tsx     # Authentication context
│   │   └── 📄 CartContext.tsx     # Shopping cart context
│   ├── 📁 hooks/                  # Custom React hooks
│   ├── 📁 services/               # API services
│   │   └── 📄 doctorService.js    # Doctor API service
│   ├── 📁 types/                  # TypeScript type definitions
│   ├── 📁 utils/                  # Utility functions
│   ├── 📄 App.tsx                 # Main App component
│   ├── 📄 App.css                 # App styles
│   ├── 📄 index.css               # Global styles
│   ├── 📄 index.jsx               # App entry point
│   └── 📄 logo.svg                # App logo
├── 📁 node_modules/               # Dependencies
├── 📄 package.json                # Frontend dependencies
├── 📄 package-lock.json           # Dependency lock file
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📄 postcss.config.js           # PostCSS configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 .env                        # Environment variables
├── 📄 .env.example                # Environment template
└── 📄 README.md                   # Frontend documentation
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String,
  role: String, // 'patient', 'doctor', 'pharmacy', 'delivery', 'admin'
  profile: {
    avatar: String,
    dateOfBirth: Date,
    gender: String,
    addresses: [{
      type: String, // 'home', 'work', 'other'
      street: String,
      city: String,
      state: String,
      pincode: String,
      isDefault: Boolean
    }]
  },
  verification: {
    isEmailVerified: Boolean,
    isPhoneVerified: Boolean,
    isProfileComplete: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Medicine Collection
```javascript
{
  _id: ObjectId,
  name: String,
  salt: String,
  category: String,
  price: Number,
  inStock: Boolean,
  stockQuantity: Number,
  description: String,
  manufacturer: String,
  dosage: String,
  sideEffects: [String],
  interactions: [String],
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  pharmacyId: ObjectId,
  deliveryId: ObjectId,
  items: [{
    medicineId: ObjectId,
    quantity: Number,
    price: Number,
    totalPrice: Number
  }],
  prescriptionId: ObjectId,
  totalAmount: Number,
  status: String, // 'pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'
  paymentMethod: String,
  paymentStatus: String,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  tracking: {
    currentStatus: String,
    timeline: [{
      status: String,
      timestamp: Date,
      location: String
    }]
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration Files

### Backend Configuration
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// ... other routes
```

### Frontend Configuration
```javascript
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Route components
import HomePage from './pages/Public/HomePage';
import LoginPage from './pages/Auth/LoginPage';
// ... other imports

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* ... other routes */}
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
```

## 🚀 Development Workflow

### 1. Setup Development Environment
```bash
# Clone repository
git clone https://github.com/Prashuu0/MedicDrop.git
cd MedicDrop

# Install dependencies
npm run install-deps

# Setup environment variables
cp env.example .env
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env

# Start development servers
npm run dev
```

### 2. Database Setup
```bash
# Start MongoDB
mongod

# Create database
mongo
use medicdrop

# Run seed scripts
npm run seed
```

### 3. Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📦 Deployment Structure

### Production Environment
```
Production Server
├── 📁 medicdrop-app/              # Application directory
│   ├── 📁 backend/                # Backend application
│   ├── 📁 frontend/               # Frontend build
│   ├── 📁 uploads/                # File uploads
│   └── 📁 logs/                   # Application logs
├── 📁 nginx/                      # Web server configuration
├── 📁 ssl/                        # SSL certificates
└── 📁 backups/                    # Database backups
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔒 Security Structure

### Authentication Flow
```
1. User Registration/Login
2. JWT Token Generation
3. Token Validation Middleware
4. Role-based Access Control
5. API Endpoint Protection
```

### Data Protection
```
1. Input Validation
2. SQL Injection Prevention
3. XSS Protection
4. CSRF Protection
5. Rate Limiting
6. Data Encryption
```

## 📊 Monitoring Structure

### Application Monitoring
```
1. Error Tracking (Sentry)
2. Performance Monitoring (New Relic)
3. Uptime Monitoring (Uptime Robot)
4. Log Aggregation (ELK Stack)
5. Metrics Collection (Prometheus)
```

### Database Monitoring
```
1. Query Performance
2. Connection Pooling
3. Index Optimization
4. Backup Verification
5. Replication Status
```

---

**MedicDrop** - Well-structured healthcare platform! 🏥💊🚀
