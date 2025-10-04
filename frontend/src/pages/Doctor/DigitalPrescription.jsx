import React, { useState } from 'react';
import { doctorService } from '../../services/doctorService';

const emptyItem = { name: '', dosage: '', frequency: '', duration: '' };

const DigitalPrescription = () => {
  const [patientId, setPatientId] = useState('');
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const setItem = (idx, key, val) => {
    setItems((prev) => prev.map((it, i) => i === idx ? { ...it, [key]: val } : it));
  };

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }]);
  const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(''); setSuccess('');
    try {
      const payload = { items, notes };
      await doctorService.createDigitalPrescription(patientId || 'PT-DEMO', payload);
      setSuccess('Digital prescription created successfully');
      setPatientId(''); setItems([{ ...emptyItem }]); setNotes('');
    } catch (e) { setError('Failed to create digital prescription'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Create Digital Prescription</h1>
        <p className="text-gray-600">Draft and sign a digital prescription for a patient.</p>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}
      {success ? <div className="alert alert-success">{success}</div> : null}

      <form onSubmit={submit} className="card p-6 space-y-4">
        <div>
          <label className="label">Patient ID</label>
          <input className="input" placeholder="e.g., PT-2001" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        </div>

        <div className="space-y-3">
          <div className="font-medium text-gray-900">Medicines</div>
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <input className="input md:col-span-2" placeholder="Medicine Name" value={it.name} onChange={(e) => setItem(idx, 'name', e.target.value)} />
              <input className="input" placeholder="Dosage (e.g., 500mg)" value={it.dosage} onChange={(e) => setItem(idx, 'dosage', e.target.value)} />
              <input className="input" placeholder="Frequency (e.g., 1-0-1)" value={it.frequency} onChange={(e) => setItem(idx, 'frequency', e.target.value)} />
              <div className="flex gap-2">
                <input className="input flex-1" placeholder="Duration (e.g., 5 days)" value={it.duration} onChange={(e) => setItem(idx, 'duration', e.target.value)} />
                <button type="button" className="btn btn-danger" onClick={() => removeItem(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-outline" onClick={addItem}>Add Medicine</button>
        </div>

        <div>
          <label className="label">Notes / Instructions</label>
          <textarea className="input" rows={3} placeholder="e.g., Take after meals, drink water"
                    value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create Prescription'}</button>
        </div>
      </form>
    </div>
  );
};

export default DigitalPrescription;


