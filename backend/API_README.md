# MedicDrop Backend API

## 🏥 Healthcare Delivery Platform API

A comprehensive Node.js/Express API for the MedicDrop healthcare delivery platform, supporting all 5 user roles with secure authentication and real-time features.

## 🚀 Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based auth
- **Role-based Access Control**: Patient, Doctor, Pharmacy, Delivery, Admin
- **OTP Verification**: Phone-based OTP for patients/delivery
- **License Verification**: Medical license validation for doctors
- **KYC Verification**: Document verification for pharmacies

### Core Modules
- **User Management**: Complete CRUD operations for all user types
- **Order Management**: End-to-end order processing workflow
- **Prescription Management**: OCR-based prescription processing
- **Inventory Management**: Real-time stock tracking
- **Delivery Tracking**: GPS-based delivery management
- **Analytics**: Comprehensive reporting and insights

### Real-time Features
- **Socket.io Integration**: Live updates and notifications
- **Order Tracking**: Real-time delivery status updates
- **Chat System**: Real-time communication between users
- **System Monitoring**: Live platform health monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Real-time**: Socket.io
- **File Upload**: Multer + Cloudinary
- **Payments**: Razorpay integration
- **SMS**: Twilio integration
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate limiting

## 📁 Project Structure

```
src/
├── config/                # Configuration files
├── controllers/           # Route controllers
├── middleware/           # Custom middleware
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling
│   └── validation.js    # Input validation
├── models/              # MongoDB schemas
│   ├── User.js         # User model
│   ├── Medicine.js     # Medicine model
│   ├── Order.js        # Order model
│   └── Prescription.js # Prescription model
├── routes/              # API routes
│   ├── authRoutes.js   # Authentication routes
│   ├── userRoutes.js   # User management
│   ├── doctorRoutes.js # Doctor-specific routes
│   ├── pharmacyRoutes.js # Pharmacy routes
│   ├── deliveryRoutes.js # Delivery routes
│   └── adminRoutes.js  # Admin routes
└── utils/              # Utility functions
    ├── emailService.js # Email service
    ├── smsService.js   # SMS service
    └── fileUpload.js   # File upload handling
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
cp env.example .env
# Edit .env with your configuration
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Start Production Server**
```bash
npm start
```

## 🔧 Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medicdrop

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# External APIs
GOOGLE_VISION_API_KEY=your_google_vision_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# SMS/OTP
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/send-otp     # Send OTP
POST /api/auth/verify-otp   # Verify OTP
POST /api/auth/logout       # User logout
```

### User Management
```
GET    /api/users           # Get all users
GET    /api/users/:id       # Get user by ID
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user
```

### Doctor Routes
```
GET    /api/doctor/profile        # Get doctor profile
PUT    /api/doctor/profile        # Update doctor profile
GET    /api/doctor/prescriptions  # Get prescriptions
POST   /api/doctor/prescriptions/:id/approve  # Approve prescription
POST   /api/doctor/prescriptions/:id/reject  # Reject prescription
GET    /api/doctor/patients       # Get patients
```

### Pharmacy Routes
```
GET    /api/pharmacy/orders       # Get pharmacy orders
PUT    /api/pharmacy/orders/:id   # Update order status
GET    /api/pharmacy/inventory    # Get inventory
POST   /api/pharmacy/inventory    # Add medicine
PUT    /api/pharmacy/inventory/:id # Update medicine
```

### Delivery Routes
```
GET    /api/delivery/orders       # Get assigned deliveries
PUT    /api/delivery/orders/:id   # Update delivery status
GET    /api/delivery/earnings     # Get earnings
POST   /api/delivery/location     # Update location
```

### Admin Routes
```
GET    /api/admin/analytics       # Get platform analytics
GET    /api/admin/users           # Get all users
PUT    /api/admin/users/:id       # Update user status
GET    /api/admin/orders          # Get all orders
GET    /api/admin/system-health   # Get system health
```

## 🔐 Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers

### Data Validation
- **Input Validation**: express-validator for request validation
- **Sanitization**: XSS protection
- **File Upload Security**: Secure file handling
- **SQL Injection Protection**: MongoDB parameterized queries

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  role: String, // patient, doctor, pharmacy, delivery, admin
  password: String,
  isVerified: Boolean,
  profile: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  orderId: String,
  patient: ObjectId,
  pharmacy: ObjectId,
  deliveryAgent: ObjectId,
  medicines: Array,
  prescription: ObjectId,
  status: String,
  totalAmount: Number,
  deliveryAddress: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Prescription Model
```javascript
{
  prescriptionId: String,
  patient: ObjectId,
  doctor: ObjectId,
  medicines: Array,
  imageUrl: String,
  status: String, // pending, approved, rejected
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "User Controller"
```

## 📈 Performance

### Optimization
- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Redis for session storage
- **Compression**: gzip compression
- **Rate Limiting**: API rate limiting
- **Connection Pooling**: MongoDB connection pooling

### Monitoring
- **Health Checks**: System health monitoring
- **Error Logging**: Comprehensive error tracking
- **Performance Metrics**: API response time monitoring
- **Uptime Monitoring**: Service availability tracking

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t medicdrop-api .

# Run container
docker run -p 5000:5000 medicdrop-api
```

### Environment Setup
1. **MongoDB Atlas**: Set up cloud database
2. **Environment Variables**: Configure production env
3. **SSL Certificate**: Enable HTTPS
4. **Domain Setup**: Configure custom domain
5. **Monitoring**: Set up logging and monitoring

## 📞 Support

For support or questions:
- **Email**: thakurprashant881@gmail.com
- **GitHub**: [@prashuu0](https://github.com/prashuu0)

## 📄 License

MIT License - see LICENSE file for details.

---

**MedicDrop Backend API** - Secure healthcare delivery platform 🏥🔒
