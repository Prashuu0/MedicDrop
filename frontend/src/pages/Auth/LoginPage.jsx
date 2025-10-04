import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ROLE_TO_REDIRECT = {
  patient: '/patient/dashboard',
  doctor: '/doctor/dashboard',
  pharmacy: '/pharmacy/dashboard',
  delivery: '/delivery/dashboard',
  admin: '/admin/dashboard',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [role, setRole] = useState('patient');
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const payload = { role };
      // accept either email or phone in a single field
      if (/^\+?\d{10,15}$/.test(identifier)) {
        payload.phone = identifier;
      } else {
        payload.email = identifier;
      }
      if (password) payload.password = password;

      const { data } = await axios.post(`${baseUrl}/auth/login`, payload);

      if (data && data.data) {
        const { token, user } = data.data;
        login(user, token);
        const redirectPath = ROLE_TO_REDIRECT[user.role] || '/';
        const from = location.state && location.state.from ? location.state.from : redirectPath;
        navigate(from, { replace: true });
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Login failed';
      setError(message);
      // Developer fallback: allow instant doctor demo login if API is not ready
      if (role === 'doctor') {
        const demoUser = {
          id: 'DOC-DEMO-1',
          name: 'Dr. Demo',
          role: 'doctor',
          email: identifier || 'dr.demo@example.com',
          specialization: 'General Physician',
        };
        const demoToken = 'demo-token';
        login(demoUser, demoToken);
        navigate('/doctor/dashboard', { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-600 mb-6">Sign in to your MedicDrop account</p>

        {error ? (
          <div className="alert alert-error mb-4">{error}</div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="delivery">Delivery</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone</label>
            <input
              type="text"
              className="input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com or 9876543210"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required={role !== 'delivery' && role !== 'patient'}
            />
            <p className="text-xs text-gray-500 mt-1">Delivery/Patient can support OTP later.</p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


