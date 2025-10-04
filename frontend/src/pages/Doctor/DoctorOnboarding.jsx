import React, { useState } from 'react';
import { doctorService } from '../../services/doctorService';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  registrationNo: '',
  specialization: '',
  qualification: '',
  experienceYears: '',
  clinicName: '',
  clinicAddress: '',
  upiId: '',
};

const specializations = [
  'General Physician',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology',
  'ENT',
  'Psychiatry',
];

const DoctorOnboarding = () => {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState({ license: null, idProof: null, clinicProof: null, avatar: null });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (key, file) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (files.license) fd.append('license', files.license);
      if (files.idProof) fd.append('idProof', files.idProof);
      if (files.clinicProof) fd.append('clinicProof', files.clinicProof);
      if (files.avatar) fd.append('avatar', files.avatar);

      await doctorService.registerDoctor(fd);
      setSuccess('Submitted for verification. You will be notified once approved.');
      setForm(initialState);
      setFiles({ license: null, idProof: null, clinicProof: null, avatar: null });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit onboarding details');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Doctor Onboarding</h1>
      <p className="text-gray-600">Provide your details and documents for verification.</p>

      {error ? <div className="alert alert-error mt-4">{error}</div> : null}
      {success ? <div className="alert alert-success mt-4">{success}</div> : null}

      <form onSubmit={handleSubmit} className="card p-6 mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Registration No. (MCI/State Council)</label>
            <input name="registrationNo" value={form.registrationNo} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Specialization</label>
            <select name="specialization" value={form.specialization} onChange={handleChange} className="input" required>
              <option value="">Select</option>
              {specializations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Qualification</label>
            <input name="qualification" value={form.qualification} onChange={handleChange} className="input" placeholder="MBBS, MD..." required />
          </div>
          <div>
            <label className="label">Experience (Years)</label>
            <input type="number" min="0" name="experienceYears" value={form.experienceYears} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Clinic/Hospital Name</label>
            <input name="clinicName" value={form.clinicName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Clinic/Hospital Address</label>
            <input name="clinicAddress" value={form.clinicAddress} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">UPI ID (optional)</label>
            <input name="upiId" value={form.upiId} onChange={handleChange} className="input" placeholder="doctor@upi" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Medical License (image/pdf)</label>
            <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFile('license', e.target.files?.[0] || null)} className="input" required />
          </div>
          <div>
            <label className="label">Government ID Proof</label>
            <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFile('idProof', e.target.files?.[0] || null)} className="input" required />
          </div>
          <div>
            <label className="label">Clinic/Practice Proof</label>
            <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFile('clinicProof', e.target.files?.[0] || null)} className="input" required />
          </div>
          <div>
            <label className="label">Profile Picture (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFile('avatar', e.target.files?.[0] || null)} className="input" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" className="btn btn-outline" onClick={() => { setForm(initialState); setFiles({ license: null, idProof: null, clinicProof: null, avatar: null }); }}>Reset</button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit for Verification'}</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorOnboarding;


