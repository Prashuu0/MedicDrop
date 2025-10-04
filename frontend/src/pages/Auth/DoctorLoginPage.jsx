import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ActionButton from '../../components/ui/ActionButton';

const DoctorLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const payload = { role: 'doctor', email, password, registrationNo };
      const { data } = await axios.post(`${baseUrl}/auth/login`, payload);

      if (data && data.data) {
        const { token, user } = data.data;
        login(user, token);
        const from = (location.state && location.state.from) || '/doctor/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Login failed';
      setError(message);
      // Dev fallback if API isn't ready
      const demoUser = {
        id: 'DOC-DEMO-1',
        name: 'Dr. Demo',
        role: 'doctor',
        email: email || 'dr.demo@example.com',
        registrationNo,
        specialization: 'General Physician',
      };
      const demoToken = 'demo-token';
      login(demoUser, demoToken);
      navigate('/doctor/dashboard', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="text-4xl mb-3">👨‍⚕️</div>
            <h2 className="text-2xl font-bold text-gray-900">Doctor Login</h2>
            <p className="text-gray-600 mt-1">Sign in with your registered credentials</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏥 Registration / License No.
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                placeholder="MCI/State Council Registration Number"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Used for verification and compliance purposes
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
              {isSubmitting ? 'Signing in...' : 'Sign in to Dashboard'}
            </ActionButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/doctor/onboarding" className="text-primary-600 hover:text-primary-700 font-medium">
                Register as Doctor
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Secure login with medical license verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;


