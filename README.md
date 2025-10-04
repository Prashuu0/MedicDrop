# 🏥 MedicDrop - Healthcare Delivery Platform

A comprehensive healthcare delivery platform connecting patients, doctors, pharmacies, delivery partners, and administrators for seamless medicine delivery and health management.

## 🌟 Features

### 👤 **Patient Panel**
- **Medicine Search & Order**: Search medicines by name/salt with auto-complete
- **Prescription Upload**: OCR-based prescription parsing and upload
- **Order Tracking**: Real-time GPS tracking of medicine delivery
- **Medicine Reminders**: Smart dosage and refill reminders
- **Health Records**: Digital medical history management
- **OTP Login**: Secure phone-based authentication

### 👨‍⚕️ **Doctor Panel**
- **Prescription Review**: Approve/reject/suggest alternatives for patient prescriptions
- **Digital Prescription**: Create and digitally sign prescriptions
- **Patient Records**: Access patient medical history and allergies
- **Drug Interaction Warnings**: AI-powered medication conflict alerts
- **License Verification**: MCI/State Council registration verification
- **Professional Dashboard**: Comprehensive analytics and reporting

### 🏥 **Pharmacy Panel**
- **Order Management**: Process incoming orders with prescription verification
- **Inventory Management**: Track stock levels with low-stock alerts
- **Invoice Generation**: Automated GST invoice creation
- **Revenue Analytics**: Daily/weekly/monthly sales reports
- **Customer Chat**: Direct communication with patients
- **KYC Verification**: License and document verification

### 🚚 **Delivery Panel**
- **GPS Navigation**: Real-time route optimization and tracking
- **Delivery Management**: Pick-up, transit, and delivery status updates
- **Earnings Tracking**: Per-delivery and daily earnings calculation
- **Performance Metrics**: Rating and completion rate tracking
- **Phone OTP Login**: Secure mobile-based authentication
- **Emergency Contacts**: Direct calling to customers/pharmacies

### 👨‍💼 **Admin Panel**
- **User Management**: Comprehensive user and role management
- **System Monitoring**: Real-time platform health and alerts
- **Analytics Dashboard**: Revenue, user growth, and regional insights
- **Content Management**: Push notifications and promotional content
- **Security Monitoring**: Login attempts and data access logs
- **2FA Authentication**: Enhanced security for admin access

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **React Router v6** for navigation
- **React Hook Form** + Yup validation
- **Axios** for API calls
- **React Hot Toast** for notifications

### **Backend**
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** authentication
- **Socket.io** for real-time features
- **Multer** for file uploads
- **Razorpay** payment integration

### **External APIs**
- **Google Vision API** for OCR
- **Google Maps API** for delivery tracking
- **Twilio** for SMS/OTP
- **Cloudinary** for image storage

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Prashuu0/MedicDrop.git
cd MedicDrop
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# Backend environment
cd backend
cp env.example .env
# Edit .env with your configuration
```

4. **Start the application**
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## 📱 **Access URLs**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### **Login Pages**
- **Patient Login**: http://localhost:3000/user/login
- **Doctor Login**: http://localhost:3000/doctor/login
- **General Login**: http://localhost:3000/login

### **Dashboard URLs**
- **Patient Dashboard**: http://localhost:3000/patient/dashboard
- **Doctor Dashboard**: http://localhost:3000/doctor/dashboard
- **Pharmacy Dashboard**: http://localhost:3000/pharmacy/dashboard
- **Delivery Dashboard**: http://localhost:3000/delivery/dashboard
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Medical Blue (#2563EB)
- **Secondary**: Health Green (#059669)
- **Accent**: Emergency Red (#DC2626)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)

### **Typography**
- **Primary Font**: Inter (Clean, modern)
- **Headings**: 24px-32px, font-weight 600-700
- **Body**: 14px-16px, font-weight 400-500

### **Components**
- **StatCard**: Medical-themed statistics with icons
- **StatusBadge**: Color-coded status indicators
- **ActionButton**: Multiple variants for different actions
- **Responsive Design**: Mobile-first approach

## 🔐 **Authentication**

### **Role-Based Access**
- **Patient**: Phone + OTP verification
- **Doctor**: Email + Password + License verification
- **Pharmacy**: Email + Password + KYC verification
- **Delivery**: Phone + OTP verification
- **Admin**: Email + Password + 2FA (optional)

## 📊 **Key Features**

### **AI Integration**
- **OCR Prescription Reading**: Automatic medicine extraction from images
- **Drug Interaction Warnings**: AI-powered medication conflict detection
- **Smart Reminders**: Intelligent dosage scheduling
- **Medicine Suggestions**: AI-based alternative recommendations

### **Real-time Features**
- **Live Order Tracking**: GPS-based delivery tracking
- **Push Notifications**: Instant updates for all stakeholders
- **Live Chat**: Real-time communication between users
- **System Monitoring**: Real-time platform health monitoring

### **Security & Compliance**
- **Health ID Integration**: Government health ID support
- **Secure Data Storage**: HIPAA-like compliance
- **Role-based Access Control**: Granular permission system
- **Audit Logs**: Comprehensive activity tracking

## 🌍 **Multi-language Support**
- **Hindi/English**: Full localization support
- **Rural-friendly UI**: Simple navigation for all age groups
- **Offline Support**: Basic functionality without internet

## 📈 **Business Model**
- **Commission from Pharmacies**: Per-order commission
- **Delivery Charges**: Service fees for delivery
- **Premium Subscriptions**: Advanced features for users
- **Advertisement Revenue**: Medicine company partnerships
- **Data Analytics**: Anonymized health insights

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Prashant Thakur**
- **Email**: thakurprashant881@gmail.com
- **GitHub**: [@prashuu0](https://github.com/prashuu0)

## 🙏 **Acknowledgments**

- Healthcare professionals for domain expertise
- Open source community for amazing tools
- Medical compliance guidelines and standards

## 📞 **Support**

For support, email thakurprashant881@gmail.com or create an issue in the repository.

---

**MedicDrop** - Revolutionizing healthcare delivery in India 🇮🇳