# 🏥 MedicDrop — Complete 5-Panel Dashboard AI Prompt

## 🎯 **PROJECT OVERVIEW**
Create a comprehensive healthcare delivery platform called "MedicDrop" with 5 distinct user panels. Each panel serves a specific role in the healthcare ecosystem with professional, real-world functionality.

---

## 🎨 **DESIGN SYSTEM & BRANDING**

### **Color Palette**
- **Primary**: #2563EB (Medical Blue)
- **Secondary**: #059669 (Health Green) 
- **Accent**: #DC2626 (Emergency Red)
- **Neutral**: #6B7280 (Text Gray)
- **Background**: #F8FAFC (Light Gray)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)

### **Typography**
- **Primary Font**: Inter (Clean, modern)
- **Headings**: 24px-32px, font-weight 600-700
- **Body**: 14px-16px, font-weight 400-500
- **Captions**: 12px, font-weight 400

### **UI Components**
- **Cards**: Rounded corners (8px), subtle shadows
- **Buttons**: Primary (solid), Secondary (outline), Danger (red)
- **Inputs**: Clean borders, focus states
- **Status Badges**: Color-coded (pending, approved, delivered)
- **Navigation**: Sidebar with icons + labels

---

## 👤 **1. USER (PATIENT) DASHBOARD**

### **Login/Signup Flow**
```
📱 Mobile-First Design
- Phone/Email + OTP verification
- Simple onboarding (name, age, address)
- Medical conditions (optional checkbox list)
```

### **Dashboard Layout**
```
┌─────────────────────────────────────────┐
│ 🏠 Dashboard    📋 Orders    💊 Medicines │
│ 👤 Profile      🔔 Reminders  📞 Support │
├─────────────────────────────────────────┤
│ 📊 QUICK OVERVIEW                        │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │ Active  │ │ Pending │ │ Delivered│     │
│ │ Orders  │ │ Orders  │ │ Orders  │     │
│ │   2     │ │   1     │ │   15    │     │
│ └─────────┘ └─────────┘ └─────────┘      │
├─────────────────────────────────────────┤
│ 🔔 MEDICINE REMINDERS                    │
│ • Metformin 500mg - 8:00 AM             │
│ • Atorvastatin 10mg - 8:00 PM           │
├─────────────────────────────────────────┤
│ 📋 RECENT ORDERS                         │
│ Order #1234 - Delivered ✅              │
│ Order #1235 - In Transit 🚚             │
│ Order #1236 - Processing ⏳              │
└─────────────────────────────────────────┘
```

### **Key Features**
- **Medicine Search**: Auto-complete, salt-based search
- **Prescription Upload**: Drag-drop, OCR preview
- **Order Tracking**: Real-time GPS, status updates
- **Reminders**: Custom schedules, push notifications
- **Health Records**: PDF upload/download, organized by date

---

## 👨‍⚕️ **2. DOCTOR DASHBOARD**

### **Login Flow**
```
📧 Email + Password + Registration Number
🔐 License verification (MCI/State Council)
```

### **Dashboard Layout**
```
┌─────────────────────────────────────────┐
│ 📊 Dashboard  📋 Prescriptions  👥 Patients│
│ 💬 Messages   📈 Reports    ⚙️ Profile   │
├─────────────────────────────────────────┤
│ 📊 OVERVIEW METRICS                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │Pending  │ │Approved │ │Rating   │     │
│ │   12    │ │  324    │ │ 4.7★    │     │
│ └─────────┘ └─────────┘ └─────────┘      │
├─────────────────────────────────────────┤
│ ⚠️ PENDING PRESCRIPTIONS                 │
│ Patient: Ravi Kumar (46M)                │
│ Meds: Atorvastatin 10mg, Metformin      │
│ [Approve] [Reject] [Suggest Alt]        │
├─────────────────────────────────────────┤
│ 📋 RECENT APPROVALS                     │
│ Patient: Meena Devi - Paracetamol ✅    │
│ Patient: Vikas Singh - Cefixime ✅      │
└─────────────────────────────────────────┘
```

### **Key Features**
- **Prescription Review**: Image viewer, patient history
- **Digital Prescription**: Create new prescriptions
- **Patient Records**: Medical history, allergies, chronic conditions
- **Drug Interaction Warnings**: AI-powered alerts
- **Emergency Flagging**: Fast-track critical cases

---

## 🏥 **3. PHARMACY DASHBOARD**

### **Onboarding Flow**
```
🏪 Pharmacy Details + License Upload
📧 Email + Password + KYC Documents
🏦 Bank Details (optional)
```

### **Dashboard Layout**
```
┌─────────────────────────────────────────┐
│ 📊 Dashboard  📦 Orders    📋 Inventory │
│ 💰 Invoices   💬 Chat     📈 Reports   │
├─────────────────────────────────────────┤
│ 📊 TODAY'S SUMMARY                      │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │Pending  │ │Packed   │ │Delivered│     │
│ │Orders   │ │Orders   │ │Orders   │     │
│ │   8     │ │   5     │ │   12    │     │
│ └─────────┘ └─────────┘ └─────────┘      │
├─────────────────────────────────────────┤
│ ⚠️ LOW STOCK ALERTS                     │
│ • Paracetamol 650mg - 5 units left      │
│ • Amoxicillin 500mg - 2 units left      │
├─────────────────────────────────────────┤
│ 📦 INCOMING ORDERS                      │
│ Order #2001 - Ravi Kumar               │
│ Prescription: Atorvastatin 10mg         │
│ [Accept] [Request Substitute]            │
└─────────────────────────────────────────┘
```

### **Key Features**
- **Order Queue**: Priority-based processing
- **Inventory Management**: Barcode scanning, expiry tracking
- **Invoice Generation**: Automated GST calculations
- **Stock Alerts**: Low-stock notifications
- **Revenue Analytics**: Daily/weekly/monthly reports

---

## 🚚 **4. DELIVERY PARTNER DASHBOARD**

### **Login Flow**
```
📱 Phone Number + OTP Verification
🚗 Vehicle Details + License Upload
💰 Bank/UPI Details
```

### **Dashboard Layout**
```
┌─────────────────────────────────────────┐
│ 📊 Dashboard  📦 Orders    🗺️ Tracking │
│ 💰 Earnings   📋 History   👤 Profile   │
├─────────────────────────────────────────┤
│ 📊 TODAY'S PERFORMANCE                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │Assigned │ │Delivered│ │Earnings │     │
│ │   15    │ │   12    │ │ ₹450    │     │
│ └─────────┘ └─────────┘ └─────────┘      │
├─────────────────────────────────────────┤
│ 🚚 ASSIGNED DELIVERIES                  │
│ Order #3001 - City Pharmacy → MG Road   │
│ Distance: 2.3km | ETA: 15 mins          │
│ [Start Navigation] [Mark Picked]         │
├─────────────────────────────────────────┤
│ 📍 LIVE TRACKING                       │
│ Current Location: Near Metro Station    │
│ Next Delivery: Order #3002              │
└─────────────────────────────────────────┘
```

### **Key Features**
- **GPS Navigation**: Real-time route optimization
- **Delivery Proof**: Photo capture, OTP verification
- **Earnings Tracking**: Per-delivery, daily totals
- **Performance Metrics**: Rating, completion rate
- **Emergency Contacts**: User/pharmacy direct calling

---

## 👨‍💼 **5. ADMIN DASHBOARD**

### **Login Flow**
```
🔐 Email + Password + 2FA (Optional)
🛡️ Role-based access control
```

### **Dashboard Layout**
```
┌─────────────────────────────────────────┐
│ 📊 Dashboard  👥 Users     🏥 Pharmacy │
│ 🚚 Delivery   📋 Orders    📈 Analytics │
│ 🔔 Notifications  ⚙️ Settings          │
├─────────────────────────────────────────┤
│ 📊 SYSTEM OVERVIEW                      │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │Total    │ │Active   │ │Revenue  │     │
│ │Orders   │ │Users    │ │Today    │     │
│ │ 1,234   │ │  456    │ │₹45,678  │     │
│ └─────────┘ └─────────┘ └─────────┘      │
├─────────────────────────────────────────┤
│ ⚠️ SYSTEM ALERTS                        │
│ • 3 Prescriptions pending doctor review │
│ • 2 Pharmacies offline                  │
│ • 1 Delivery agent delayed              │
├─────────────────────────────────────────┤
│ 📈 LIVE ACTIVITY                        │
│ • 12 orders placed in last hour         │
│ • 8 deliveries completed                │
│ • 3 new doctor registrations           │
└─────────────────────────────────────────┘
```

### **Key Features**
- **User Management**: Bulk actions, activity monitoring
- **Verification System**: Doctor/pharmacy approval workflow
- **Analytics Dashboard**: Revenue, user growth, regional data
- **Content Management**: Push notifications, banners
- **Security Monitoring**: Login attempts, data access logs

---

## 🎯 **IMPLEMENTATION REQUIREMENTS**

### **Technical Stack**
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Context API + React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup validation
- **Charts**: Recharts for analytics
- **Maps**: Google Maps API for delivery tracking

### **Responsive Design**
- **Mobile First**: All panels optimized for mobile
- **Breakpoints**: 320px, 768px, 1024px, 1440px
- **Touch Friendly**: Large buttons, swipe gestures
- **Offline Support**: Basic functionality without internet

### **Accessibility**
- **WCAG 2.1 AA**: Color contrast, keyboard navigation
- **Screen Reader**: Proper ARIA labels
- **Multi-language**: Hindi/English support
- **Font Scaling**: Respects system font size

---

## 🚀 **DEVELOPMENT PRIORITY**

1. **Phase 1**: User + Doctor panels (core functionality)
2. **Phase 2**: Pharmacy + Delivery panels (business logic)
3. **Phase 3**: Admin panel (analytics + management)
4. **Phase 4**: Advanced features (AI, real-time tracking)

---

**Use this prompt with any AI design tool or development framework to generate pixel-perfect, production-ready healthcare dashboard interfaces.**
