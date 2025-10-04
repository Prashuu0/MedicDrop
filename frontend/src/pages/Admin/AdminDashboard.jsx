import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ActionButton from '../../components/ui/ActionButton';

const AlertItem = ({ alert, onResolve }) => (
  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{alert.title}</h4>
        <p className="text-sm text-gray-600">{alert.description}</p>
        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
      </div>
      <ActionButton variant="warning" size="sm" onClick={() => onResolve(alert.id)}>
        Resolve
      </ActionButton>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="text-2xl">{activity.icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalOrders: 0, activeUsers: 0, revenue: 0 });
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [liveActivity, setLiveActivity] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError('');
        // Mock data for demo
        const fallbackStats = { totalOrders: 1234, activeUsers: 456, revenue: 45678 };
        const fallbackAlerts = [
          { id: 'ALERT-1', title: '3 Prescriptions Pending', description: 'Doctor review required', time: '2 hours ago' },
          { id: 'ALERT-2', title: '2 Pharmacies Offline', description: 'Connection issues detected', time: '1 hour ago' },
          { id: 'ALERT-3', title: '1 Delivery Agent Delayed', description: 'Order #3001 running late', time: '30 mins ago' },
        ];
        const fallbackActivity = [
          { icon: '🛒', description: '12 orders placed in last hour', time: '5 mins ago' },
          { icon: '📦', description: '8 deliveries completed', time: '10 mins ago' },
          { icon: '👨‍⚕️', description: '3 new doctor registrations', time: '15 mins ago' },
          { icon: '🏥', description: '1 pharmacy went online', time: '20 mins ago' },
        ];

        if (!mounted) return;
        setStats(fallbackStats);
        setSystemAlerts(fallbackAlerts);
        setLiveActivity(fallbackActivity);
      } catch (e) {
        if (!mounted) return;
        setError('Unable to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [baseUrl]);

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">👨‍💼 Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor system health, manage users, and track platform performance</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton variant="outline" icon="📊">
              Analytics
            </ActionButton>
            <ActionButton variant="primary" icon="⚙️">
              System Settings
            </ActionButton>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            subtitle="All time"
            icon="📦"
            color="primary"
          />
          <StatCard 
            title="Active Users" 
            value={stats.activeUsers} 
            subtitle="Currently online"
            icon="👥"
            color="success"
          />
          <StatCard 
            title="Revenue Today" 
            value={`₹${stats.revenue}`} 
            subtitle="Platform earnings"
            icon="💰"
            color="medical"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* System Alerts */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">⚠️ System Alerts</h2>
                  <p className="text-gray-600 mt-1">Issues requiring immediate attention</p>
                </div>
                <ActionButton variant="outline" size="sm">
                  View All Alerts
                </ActionButton>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-gray-600">Loading alerts...</span>
                  </div>
                ) : systemAlerts.length ? (
                  <div className="space-y-4">
                    {systemAlerts.map(alert => (
                      <AlertItem
                        key={alert.id}
                        alert={alert}
                        onResolve={handleResolveAlert}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All systems operational</h3>
                    <p className="text-gray-600">No alerts at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Activity */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">📈 Live Activity</h3>
              </div>
              <div className="p-6">
                {liveActivity.length ? (
                  <div className="space-y-4">
                    {liveActivity.map((activity, index) => (
                      <ActivityItem
                        key={index}
                        activity={activity}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📊</div>
                    <p>No recent activity</p>
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
                  <ActionButton variant="outline" icon="👥" className="justify-start">
                    User Management
                  </ActionButton>
                  <ActionButton variant="outline" icon="🏥" className="justify-start">
                    Pharmacy Management
                  </ActionButton>
                  <ActionButton variant="outline" icon="👨‍⚕️" className="justify-start">
                    Doctor Verification
                  </ActionButton>
                  <ActionButton variant="outline" icon="📊" className="justify-start">
                    Analytics Report
                  </ActionButton>
                  <ActionButton variant="outline" icon="🔔" className="justify-start">
                    Send Notifications
                  </ActionButton>
                  <ActionButton variant="outline" icon="🛡️" className="justify-start">
                    Security Logs
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

export default AdminDashboard;
