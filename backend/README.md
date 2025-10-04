# MedicDrop - Healthcare Delivery Platform

## 🏥 Project Overview

MedicDrop is a comprehensive healthcare delivery platform designed for India's tier-2 and rural regions. It connects patients, doctors, pharmacies, delivery partners, and administrators in a seamless ecosystem for medicine delivery and health management.

## 🎯 Key Features

### Multi-Panel Architecture
- **👤 Patient Panel**: Medicine ordering, prescription upload, order tracking
- **👨‍⚕️ Doctor Panel**: Prescription review, patient management, digital prescriptions
- **🏥 Pharmacy Panel**: Order processing, inventory management, revenue analytics
- **🚚 Delivery Panel**: GPS navigation, delivery tracking, earnings management
- **👨‍💼 Admin Panel**: System monitoring, user management, analytics

### Advanced Features
- **AI-Powered OCR**: Automatic prescription reading and medicine extraction
- **Real-time Tracking**: GPS-based delivery tracking with live updates
- **Smart Reminders**: Intelligent medicine dosage and refill reminders
- **Multi-language Support**: Hindi/English localization
- **Role-based Authentication**: Secure access control for all user types

## 🛠️ Technology Stack

### Frontend
- React 18+ with TypeScript
- Tailwind CSS for styling
- React Router v6 for navigation
- React Hook Form + Yup validation
- Professional medical UI components

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time features
- File upload handling

### External Integrations
- Google Vision API (OCR)
- Google Maps API (tracking)
- Twilio (SMS/OTP)
- Razorpay (payments)
- Cloudinary (file storage)

## 🚀 Quick Start

1. **Clone Repository**
```bash
git clone https://github.com/Prashuu0/MedicDrop.git
cd MedicDrop
```

2. **Install Dependencies**
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

3. **Environment Setup**
```bash
cd backend
cp env.example .env
# Configure your environment variables
```

4. **Start Application**
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm start
```

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Doctor Login**: http://localhost:3000/doctor/login
- **Patient Login**: http://localhost:3000/user/login

## 🎨 Design Philosophy

- **Medical Industry Standards**: Professional healthcare UI/UX
- **Rural-friendly Design**: Simple navigation for all age groups
- **Mobile-first Approach**: Optimized for smartphone users
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast loading for low-bandwidth areas

## 🔐 Security Features

- **Health ID Integration**: Government health ID support
- **Secure Data Storage**: HIPAA-like compliance
- **Role-based Access Control**: Granular permissions
- **Audit Logging**: Comprehensive activity tracking
- **2FA Support**: Enhanced admin security

## 📊 Business Model

- Commission from pharmacies
- Delivery service charges
- Premium subscriptions
- Advertisement revenue
- Data analytics services

## 🌍 Target Market

- **Primary**: Tier-2 and Tier-3 cities
- **Secondary**: Rural areas with limited pharmacy access
- **Tertiary**: Urban areas for convenience

## 👨‍💻 Author

**Prashant Thakur**
- Email: thakurprashant881@gmail.com
- GitHub: [@prashuu0](https://github.com/prashuu0)

## 📄 License

MIT License - see LICENSE file for details.

---

**MedicDrop** - Revolutionizing healthcare delivery in India 🇮🇳
