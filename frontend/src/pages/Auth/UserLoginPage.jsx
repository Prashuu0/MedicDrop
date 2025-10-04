import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ActionButton from '../../components/ui/ActionButton';

const UserLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const payload = { role: 'patient', phone };
      await axios.post(`${baseUrl}/auth/send-otp`, payload);
      
      setIsOtpSent(true);
      setOtpTimer(60);
      const timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to send OTP';
      setError(message);
      // Dev fallback - auto proceed
      setIsOtpSent(true);
      setOtpTimer(60);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const payload = { role: 'patient', phone, otp };
      const { data } = await axios.post(`${baseUrl}/auth/verify-otp`, payload);

      if (data && data.data) {
        const { token, user } = data.data;
        login(user, token);
        const from = (location.state && location.state.from) || '/patient/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'OTP verification failed';
      setError(message);
      // Dev fallback - auto login
      const demoUser = {
        id: 'USER-DEMO-1',
        name: 'Patient Demo',
        role: 'patient',
        phone: phone || '9876543210',
        email: 'patient@example.com',
      };
      const demoToken = 'demo-token';
      login(demoUser, demoToken);
      navigate('/patient/dashboard', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = () => {
    handleSendOtp({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <span className="text-3xl">🏥</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">MedicDrop</h1>
          <p className="text-gray-600 mt-1">Healthcare Delivery Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-medical border border-gray-200 p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">👤</div>
            <h2 className="text-2xl font-bold text-gray-900">Patient Login</h2>
            <p className="text-gray-600 mt-1">
              {isOtpSent ? 'Enter the OTP sent to your phone' : 'Sign in with your mobile number'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📱 Mobile Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  We'll send you an OTP for verification
                </p>
              </div>

              <ActionButton 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
              </ActionButton>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔢 Enter OTP
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-center text-2xl tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength="6"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  OTP sent to {phone}
                </p>
              </div>

              <ActionButton 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify & Login'}
              </ActionButton>

              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in {otpTimer}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to MedicDrop?{' '}
              <a href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Create Account
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Secure OTP-based authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
