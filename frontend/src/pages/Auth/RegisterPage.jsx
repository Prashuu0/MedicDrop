import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [license, setLicense] = useState('');
  const [kyc, setKyc] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const payload = { role, name, email, phone, password };
      if (role === 'doctor') payload.license = license;
      if (role === 'pharmacy') payload.kyc = kyc;
      const { data } = await axios.post(`${baseUrl}/auth/register`, payload);
      if (data?.success) {
        navigate('/login');
      } else {
        throw new Error(data?.message || 'Registration failed');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Registration failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create account</h1>
        <p className="text-gray-600 mb-6">Join MedicDrop to manage your healthcare</p>

        {error ? (
          <div className="alert alert-error mb-4">{error}</div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {role === 'doctor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License No.</label>
              <input className="input" value={license} onChange={(e) => setLicense(e.target.value)} required />
            </div>
          )}

          {role === 'pharmacy' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KYC ID</label>
              <input className="input" value={kyc} onChange={(e) => setKyc(e.target.value)} required />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;


