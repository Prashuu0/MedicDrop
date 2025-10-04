import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ActionButton from '../../components/ui/ActionButton';

const OrderItem = ({ order, onTrack }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-medical transition-all duration-200">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
          <StatusBadge status={order.status} />
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Placed:</span> {order.placedAt} • 
          <span className="font-medium ml-1">Amount:</span> ₹{order.amount}
        </div>
        <div className="text-sm text-gray-700 mb-3">
          <span className="font-medium">Medicines:</span> {order.medicines?.join(', ')}
        </div>
        {order.pharmacy && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <span className="font-medium">Pharmacy:</span> {order.pharmacy}
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <ActionButton variant="outline" size="sm" onClick={() => onTrack(order.id)}>
          Track Order
        </ActionButton>
        <ActionButton variant="primary" size="sm">
          Reorder
        </ActionButton>
      </div>
    </div>
  </div>
);

const ReminderItem = ({ reminder, onEdit, onDelete }) => (
  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{reminder.medicine}</h4>
        <p className="text-sm text-gray-600">{reminder.time} • {reminder.frequency}</p>
        <p className="text-xs text-gray-500 mt-1">Next: {reminder.nextDose}</p>
      </div>
      <div className="flex gap-2">
        <ActionButton variant="outline" size="sm" onClick={() => onEdit(reminder.id)}>
          Edit
        </ActionButton>
        <ActionButton variant="danger" size="sm" onClick={() => onDelete(reminder.id)}>
          Delete
        </ActionButton>
      </div>
    </div>
  </div>
);

const PatientDashboard = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ activeOrders: 0, pendingOrders: 0, deliveredOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError('');
        // Mock data for demo
        const fallbackStats = { activeOrders: 2, pendingOrders: 1, deliveredOrders: 15 };
        const fallbackOrders = [
          { id: 'ORD-1234', status: 'delivered', placedAt: '2 days ago', amount: 450, medicines: ['Paracetamol 650mg', 'Amoxicillin 500mg'], pharmacy: 'City Pharmacy' },
          { id: 'ORD-1235', status: 'in-transit', placedAt: 'Yesterday', amount: 320, medicines: ['Atorvastatin 10mg'], pharmacy: 'MedPlus' },
          { id: 'ORD-1236', status: 'processing', placedAt: 'Today', amount: 180, medicines: ['Metformin 500mg'], pharmacy: 'Apollo Pharmacy' },
        ];
        const fallbackReminders = [
          { id: 'REM-1', medicine: 'Metformin 500mg', time: '8:00 AM', frequency: 'Daily', nextDose: 'Tomorrow 8:00 AM' },
          { id: 'REM-2', medicine: 'Atorvastatin 10mg', time: '8:00 PM', frequency: 'Daily', nextDose: 'Today 8:00 PM' },
        ];

        if (!mounted) return;
        setStats(fallbackStats);
        setRecentOrders(fallbackOrders);
        setReminders(fallbackReminders);
      } catch (e) {
        if (!mounted) return;
        setError('Unable to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [baseUrl]);

  const handleTrackOrder = (orderId) => {
    console.log('Tracking order:', orderId);
    // Navigate to tracking page
  };

  const handleEditReminder = (reminderId) => {
    console.log('Editing reminder:', reminderId);
  };

  const handleDeleteReminder = (reminderId) => {
    console.log('Deleting reminder:', reminderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">👤 Patient Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your medicines, track orders, and stay healthy</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton variant="outline" icon="📋">
              Upload Prescription
            </ActionButton>
            <ActionButton variant="primary" icon="🔍">
              Search Medicines
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
            title="Active Orders" 
            value={stats.activeOrders} 
            subtitle="Currently processing"
            icon="📦"
            color="primary"
          />
          <StatCard 
            title="Pending Orders" 
            value={stats.pendingOrders} 
            subtitle="Awaiting approval"
            icon="⏳"
            color="warning"
          />
          <StatCard 
            title="Delivered Orders" 
            value={stats.deliveredOrders} 
            subtitle="Successfully delivered"
            icon="✅"
            color="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">📦 Recent Orders</h2>
                  <p className="text-gray-600 mt-1">Track your medicine orders and delivery status</p>
                </div>
                <ActionButton variant="outline" size="sm">
                  View All Orders
                </ActionButton>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-gray-600">Loading orders...</span>
                  </div>
                ) : recentOrders.length ? (
                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <OrderItem
                        key={order.id}
                        order={order}
                        onTrack={handleTrackOrder}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600">Start by searching for medicines or uploading a prescription</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Medicine Reminders */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">🔔 Medicine Reminders</h3>
              </div>
              <div className="p-6">
                {reminders.length ? (
                  <div className="space-y-4">
                    {reminders.map(reminder => (
                      <ReminderItem
                        key={reminder.id}
                        reminder={reminder}
                        onEdit={handleEditReminder}
                        onDelete={handleDeleteReminder}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">⏰</div>
                    <p>No reminders set</p>
                  </div>
                )}
                <div className="mt-4">
                  <ActionButton variant="outline" size="sm" className="w-full">
                    Add Reminder
                  </ActionButton>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">🚀 Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-3">
                  <ActionButton variant="outline" icon="🔍" className="justify-start">
                    Search Medicines
                  </ActionButton>
                  <ActionButton variant="outline" icon="📋" className="justify-start">
                    Upload Prescription
                  </ActionButton>
                  <ActionButton variant="outline" icon="📊" className="justify-start">
                    Health Records
                  </ActionButton>
                  <ActionButton variant="outline" icon="💬" className="justify-start">
                    Chat Support
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

export default PatientDashboard;
