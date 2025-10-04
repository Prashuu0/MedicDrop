import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/doctorService';

const StatusBadge = ({ status }) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return <span className={`px-2 py-0.5 rounded text-xs ${map[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const PrescriptionReview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [rejectReason, setRejectReason] = useState('');
  const [altText, setAltText] = useState('');
  const [activeId, setActiveId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await doctorService.getPrescriptions({ status: 'pending' }).catch(() => ({ data: { data: null } }));
      const fallback = [
        { id: 'PR-1101', patient: { name: 'Rahul Verma', age: 34, gender: 'M' }, uploadedAt: '10:30 AM', meds: ['Azithromycin 500mg'], notes: 'Fever, sore throat', status: 'pending' },
        { id: 'PR-1102', patient: { name: 'Neha Sharma', age: 27, gender: 'F' }, uploadedAt: '9:50 AM', meds: ['Ibuprofen 400mg'], notes: 'Headache', status: 'pending' },
      ];
      setItems(res?.data?.data || fallback);
    } catch (e) {
      setError('Failed to load prescriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    try {
      await doctorService.approvePrescription(id, 'Approved');
    } catch {}
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const reject = async (id) => {
    try {
      await doctorService.rejectPrescription(id, rejectReason || 'Not appropriate');
    } catch {}
    setRejectReason('');
    setActiveId(null);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const suggestAlt = async (id) => {
    try {
      await doctorService.suggestAlternative(id, altText ? altText.split(',').map((s) => s.trim()) : []);
    } catch {}
    setAltText('');
    setActiveId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Prescription Review</h1>
        <p className="text-gray-600">Review and verify patient prescriptions for accuracy and safety.</p>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="card">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl flex items-center justify-between">
          <div className="font-medium text-gray-900">Pending ({items.length})</div>
          <button onClick={load} className="btn btn-outline btn-sm">Refresh</button>
        </div>
        {loading ? (
          <div className="p-5 text-sm text-gray-500">Loading...</div>
        ) : items.length ? (
          <div className="divide-y">
            {items.map((p) => (
              <div key={p.id} className="px-4 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-900">{p.patient.name} • {p.patient.age}y • {p.patient.gender}</div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">ID: {p.id} • {p.uploadedAt}</div>
                    <div className="text-sm text-gray-700 mt-1">Meds: {p.meds?.join(', ')}</div>
                    {p.notes ? <div className="text-sm text-gray-500 mt-1">Notes: {p.notes}</div> : null}
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => approve(p.id)}>Approve</button>
                    <button className="btn btn-warning btn-sm" onClick={() => setActiveId(p.id)}>Suggest Alt</button>
                    <button className="btn btn-danger btn-sm" onClick={() => setActiveId(p.id)}>Reject</button>
                  </div>
                </div>

                {activeId === p.id ? (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="label">Alternative Suggestions (comma-separated)</label>
                      <input className="input" placeholder="e.g., Dolo 650, Aceclofenac 100"
                             value={altText} onChange={(e) => setAltText(e.target.value)} />
                      <div className="mt-2 flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={() => suggestAlt(p.id)}>Send Suggestions</button>
                        <button className="btn btn-outline btn-sm" onClick={() => setAltText('')}>Clear</button>
                      </div>
                    </div>
                    <div>
                      <label className="label">Rejection Reason</label>
                      <input className="input" placeholder="Reason to reject"
                             value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} />
                      <div className="mt-2 flex gap-2">
                        <button className="btn btn-danger btn-sm" onClick={() => reject(p.id)}>Confirm Reject</button>
                        <button className="btn btn-outline btn-sm" onClick={() => { setRejectReason(''); setActiveId(null); }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 text-sm text-gray-500">No pending prescriptions</div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionReview;


