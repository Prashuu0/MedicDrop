import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Layout from './components/Layout/Layout';
import PublicLayout from './components/Layout/PublicLayout';

// Public Pages
import HomePage from './pages/Public/HomePage';
import LoginPage from './pages/Auth/LoginPage.jsx';
import UserLoginPage from './pages/Auth/UserLoginPage.jsx';
import DoctorLoginPage from './pages/Auth/DoctorLoginPage.jsx';
import RegisterPage from './pages/Auth/RegisterPage.jsx';
import AboutPage from './pages/Public/AboutPage';
import ContactPage from './pages/Public/ContactPage';

// Patient Pages
import PatientDashboard from './pages/Patient/PatientDashboard.jsx';
import MedicineSearch from './pages/Patient/MedicineSearch';
import PrescriptionUpload from './pages/Patient/PrescriptionUpload';
import OrderHistory from './pages/Patient/OrderHistory';
import OrderTracking from './pages/Patient/OrderTracking';
import PatientProfile from './pages/Patient/PatientProfile';

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import PrescriptionReview from './pages/Doctor/PrescriptionReview.jsx';
import PatientManagement from './pages/Doctor/PatientManagement.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorOnboarding from './pages/Doctor/DoctorOnboarding.jsx';
import Messages from './pages/Doctor/Messages.jsx';
import Reports from './pages/Doctor/Reports.jsx';
import DigitalPrescription from './pages/Doctor/DigitalPrescription.jsx';

// Pharmacy Pages
import PharmacyDashboard from './pages/Pharmacy/PharmacyDashboard.jsx';
import InventoryManagement from './pages/Pharmacy/InventoryManagement';
import OrderManagement from './pages/Pharmacy/OrderManagement';
import PharmacyProfile from './pages/Pharmacy/PharmacyProfile';

// Delivery Pages
import DeliveryDashboard from './pages/Delivery/DeliveryDashboard.jsx';
import DeliveryOrders from './pages/Delivery/DeliveryOrders';
import DeliveryTracking from './pages/Delivery/DeliveryTracking';
import DeliveryProfile from './pages/Delivery/DeliveryProfile';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import UserManagement from './pages/Admin/UserManagement';
import PharmacyManagement from './pages/Admin/PharmacyManagement';
import OrderAnalytics from './pages/Admin/OrderAnalytics';
import AdminProfile from './pages/Admin/AdminProfile';

// Protected Route Component
import ProtectedRoute from './components/Auth/ProtectedRoute';
import RoleBasedRoute from './components/Auth/RoleBasedRoute';

// Error Pages
import NotFoundPage from './pages/Error/NotFoundPage';
import UnauthorizedPage from './pages/Error/UnauthorizedPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="user/login" element={<UserLoginPage />} />
                <Route path="doctor/login" element={<DoctorLoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>

              {/* Patient Routes */}
              <Route path="/patient" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['patient']}>
                    <Layout userRole="patient" />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/patient/dashboard" replace />} />
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="medicines" element={<MedicineSearch />} />
                <Route path="prescriptions" element={<PrescriptionUpload />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="orders/:orderId/track" element={<OrderTracking />} />
                <Route path="profile" element={<PatientProfile />} />
              </Route>

              {/* Doctor Routes */}
              <Route path="/doctor" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['doctor']}>
                    <Layout userRole="doctor" />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/doctor/dashboard" replace />} />
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="prescriptions" element={<PrescriptionReview />} />
                <Route path="patients" element={<PatientManagement />} />
                <Route path="profile" element={<DoctorProfile />} />
                <Route path="onboarding" element={<DoctorOnboarding />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="digital-rx" element={<DigitalPrescription />} />
              </Route>

              {/* Pharmacy Routes */}
              <Route path="/pharmacy" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['pharmacy']}>
                    <Layout userRole="pharmacy" />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/pharmacy/dashboard" replace />} />
                <Route path="dashboard" element={<PharmacyDashboard />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="profile" element={<PharmacyProfile />} />
              </Route>

              {/* Delivery Routes */}
              <Route path="/delivery" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['delivery']}>
                    <Layout userRole="delivery" />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/delivery/dashboard" replace />} />
                <Route path="dashboard" element={<DeliveryDashboard />} />
                <Route path="orders" element={<DeliveryOrders />} />
                <Route path="tracking" element={<DeliveryTracking />} />
                <Route path="profile" element={<DeliveryProfile />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['admin']}>
                    <Layout userRole="admin" />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="pharmacies" element={<PharmacyManagement />} />
                <Route path="analytics" element={<OrderAnalytics />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>

              {/* Error Routes */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#374151',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  padding: '16px',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: '#3b82f6',
                    secondary: '#fff',
                  },
                },
              }}
            />
    </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;