import React, { useEffect, useState } from 'react';

const Stat = ({ label, value, sub }) => (
  <div className="card p-5">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
  </div>
);

const Reports = () => {
  const [stats, setStats] = useState({ approved: 0, rejected: 0, avgTime: '—', topMeds: [] });

  useEffect(() => {
    // Placeholder; wire API later
    setStats({ approved: 122, rejected: 7, avgTime: '3m 40s', topMeds: ['Paracetamol 650', 'Amoxicillin 500', 'Atorvastatin 10'] });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Insights on your prescription activity and patient outcomes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Approved Prescriptions" value={stats.approved} />
        <Stat label="Rejected Prescriptions" value={stats.rejected} />
        <Stat label="Avg Review Time" value={stats.avgTime} />
      </div>

      <div className="card p-5">
        <div className="font-medium text-gray-900">Top Prescribed Medicines</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {stats.topMeds.map((m) => (
            <span key={m} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;


