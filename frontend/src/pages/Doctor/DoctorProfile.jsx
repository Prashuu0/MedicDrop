import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/doctorService';

const DoctorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', specialization: '', qualification: '', clinicName: '', clinicAddress: '' });

  useEffect(() => {
    (async () => {
      setLoading(true); setError('');
      try {
        const res = await doctorService.fetchProfile().catch(() => ({ data: { data: null } }));
        const fallback = { fullName: 'Dr. A Sharma', email: 'dr.sharma@example.com', phone: '+91-90xxxxxxx', specialization: 'General Physician', qualification: 'MBBS', clinicName: 'City Clinic', clinicAddress: 'MG Road, Jaipur' };
        setProfile(res?.data?.data || fallback);
      } catch (e) { setError('Failed to load profile'); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const save = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await doctorService.updateProfile(profile);
      setSuccess('Profile updated');
    } catch (e) { setError('Failed to update'); }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900">Doctor Profile</h1>
      <p className="text-gray-600">Update your professional and clinic details.</p>

      {error ? <div className="alert alert-error mt-4">{error}</div> : null}
      {success ? <div className="alert alert-success mt-4">{success}</div> : null}

      {loading ? (
        <div className="mt-6 text-sm text-gray-500">Loading...</div>
      ) : (
        <form onSubmit={save} className="card p-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input name="fullName" className="input" value={profile.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" name="email" className="input" value={profile.email} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input name="phone" className="input" value={profile.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Specialization</label>
            <input name="specialization" className="input" value={profile.specialization} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Qualification</label>
            <input name="qualification" className="input" value={profile.qualification} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Clinic Name</label>
            <input name="clinicName" className="input" value={profile.clinicName} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Clinic Address</label>
            <input name="clinicAddress" className="input" value={profile.clinicAddress} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn btn-primary" type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DoctorProfile;


