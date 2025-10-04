import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ActionButton from '../../components/ui/ActionButton';

const PrescriptionItem = ({ prescription, onApprove, onReject, onSuggestAlt }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-medical transition-all duration-200">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-gray-900">{prescription.patient}</h3>
          <span className="text-sm text-gray-500">• {prescription.age}y</span>
          <StatusBadge status="pending" />
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">ID:</span> {prescription.id} • 
          <span className="font-medium ml-1">Uploaded:</span> {prescription.uploadedAt}
        </div>
        <div className="text-sm text-gray-700 mb-3">
          <span className="font-medium">Medicines:</span> {prescription.meds?.join(', ')}
        </div>
        {prescription.notes && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <span className="font-medium">Notes:</span> {prescription.notes}
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <ActionButton variant="success" size="sm" onClick={() => onApprove(prescription.id)}>
          Approve
        </ActionButton>
        <ActionButton variant="warning" size="sm" onClick={() => onSuggestAlt(prescription.id)}>
          Suggest Alt
        </ActionButton>
        <ActionButton variant="danger" size="sm" onClick={() => onReject(prescription.id)}>
          Reject
        </ActionButton>
      </div>
    </div>
  </div>
);

const FilterPill = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-primary-100 text-primary-800 border-2 border-primary-200' 
        : 'text-gray-600 border-2 border-transparent hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const DoctorDashboard = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalReviewed: 0, pending: 0, rating: 0, earnings: 0 });
  const [pendingList, setPendingList] = useState([]);
  const [recentApproved, setRecentApproved] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError('');
        // Parallel requests; backend endpoints may not exist yet, so failover to demo data
        const reqs = [
          axios.get(`${baseUrl}/doctor/overview`).catch(() => ({ data: { data: null } })),
          axios.get(`${baseUrl}/doctor/prescriptions?status=pending`).catch(() => ({ data: { data: null } })),
          axios.get(`${baseUrl}/doctor/prescriptions?status=approved&limit=5`).catch(() => ({ data: { data: null } })),
        ];
        const [ovr, pend, appr] = await Promise.all(reqs);

        const fallbackPending = [
          { id: 'PR-1023', patient: 'Ravi Kumar', age: 46, uploadedAt: '10:12 AM', meds: ['Atorvastatin 10mg', 'Metformin 500mg'] },
          { id: 'PR-1024', patient: 'Saloni Gupta', age: 29, uploadedAt: '09:40 AM', meds: ['Levocetirizine 5mg'] },
          { id: 'PR-1025', patient: 'Imran Ali', age: 61, uploadedAt: 'Yesterday', meds: ['Amlodipine 5mg', 'Losartan 50mg'] },
        ];
        const fallbackApproved = [
          { id: 'PR-0999', patient: 'Meena Devi', approvedAt: 'Yesterday', meds: ['Paracetamol 650mg'] },
          { id: 'PR-0998', patient: 'Vikas Singh', approvedAt: '2 days ago', meds: ['Cefixime 200mg'] },
        ];
        const overview = ovr?.data?.data || { totalReviewed: 324, pending: 10, rating: 4.7, earnings: 12450 };
        const pending = pend?.data?.data || fallbackPending;
        const approved = appr?.data?.data || fallbackApproved;

        if (!mounted) return;
        setStats(overview);
        setPendingList(pending);
        setRecentApproved(approved);
      } catch (e) {
        if (!mounted) return;
        setError('Unable to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  const filteredPending = useMemo(() => {
    if (filter === 'all') return pendingList;
    if (filter === 'today') return pendingList.slice(0, 2);
    return pendingList;
  }, [filter, pendingList]);

  const handleApprove = (id) => {
    console.log('Approving prescription:', id);
    // API call would go here
  };

  const handleReject = (id) => {
    console.log('Rejecting prescription:', id);
    // API call would go here
  };

  const handleSuggestAlt = (id) => {
    console.log('Suggesting alternative for prescription:', id);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">👨‍⚕️ Doctor Dashboard</h1>
            <p className="text-gray-600 mt-1">Review prescriptions, manage patients, and track your impact</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton variant="outline" icon="📊">
              Reports
            </ActionButton>
            <ActionButton variant="primary" icon="➕">
              Create Prescription
            </ActionButton>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Pending Reviews" 
            value={stats.pending} 
            subtitle="Awaiting approval"
            icon="⏳"
            color="warning"
          />
          <StatCard 
            title="Total Reviewed" 
            value={stats.totalReviewed} 
            subtitle="All time"
            icon="📋"
            color="primary"
          />
          <StatCard 
            title="Patient Rating" 
            value={`${stats.rating} ⭐`} 
            subtitle="Average feedback"
            icon="⭐"
            color="success"
          />
          <StatCard 
            title="Monthly Earnings" 
            value={`₹${stats.earnings}`} 
            subtitle="This month"
            icon="💰"
            color="medical"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Pending Prescriptions */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">⚠️ Pending Prescriptions</h2>
                  <p className="text-gray-600 mt-1">Verify and approve patient prescriptions</p>
                </div>
                <div className="flex items-center gap-2">
                  <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>
                    All ({pendingList.length})
                  </FilterPill>
                  <FilterPill active={filter === 'today'} onClick={() => setFilter('today')}>
                    Today ({pendingList.slice(0, 2).length})
                  </FilterPill>
                </div>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-gray-600">Loading prescriptions...</span>
                  </div>
                ) : filteredPending.length ? (
                  <div className="space-y-4">
                    {filteredPending.map(item => (
                      <PrescriptionItem
                        key={item.id}
                        prescription={item}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onSuggestAlt={handleSuggestAlt}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No pending prescriptions to review</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Approvals */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">✅ Recent Approvals</h3>
              </div>
              <div className="p-6">
                {recentApproved.length ? (
                  <div className="space-y-4">
                    {recentApproved.map(item => (
                      <div key={item.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{item.patient}</h4>
                          <StatusBadge status="approved" size="sm" />
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>ID: {item.id}</div>
                          <div>Approved: {item.approvedAt}</div>
                          <div className="mt-1 font-medium">{item.meds?.join(', ')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📋</div>
                    <p>No recent approvals</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">🚀 Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-3">
                  <ActionButton variant="outline" icon="📝" className="justify-start">
                    Create Digital Rx
                  </ActionButton>
                  <ActionButton variant="outline" icon="👥" className="justify-start">
                    View Patients
                  </ActionButton>
                  <ActionButton variant="outline" icon="💬" className="justify-start">
                    Messages
                  </ActionButton>
                  <ActionButton variant="outline" icon="📊" className="justify-start">
                    Analytics
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;


