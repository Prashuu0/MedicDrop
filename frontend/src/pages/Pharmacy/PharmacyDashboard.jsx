import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ActionButton from '../../components/ui/ActionButton';

const OrderItem = ({ order, onAccept, onRequestSubstitute }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-medical transition-all duration-200">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
          <StatusBadge status={order.status} />
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Customer:</span> {order.customer} • 
          <span className="font-medium ml-1">Amount:</span> ₹{order.amount}
        </div>
        <div className="text-sm text-gray-700 mb-3">
          <span className="font-medium">Medicines:</span> {order.medicines?.join(', ')}
        </div>
        {order.prescription && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <span className="font-medium">Prescription:</span> {order.prescription}
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <ActionButton variant="success" size="sm" onClick={() => onAccept(order.id)}>
          Accept
        </ActionButton>
        <ActionButton variant="warning" size="sm" onClick={() => onRequestSubstitute(order.id)}>
          Request Substitute
        </ActionButton>
      </div>
    </div>
  </div>
);

const StockAlert = ({ medicine, onRestock }) => (
  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{medicine.name}</h4>
        <p className="text-sm text-red-600">Only {medicine.stock} units left</p>
        <p className="text-xs text-gray-500 mt-1">Expires: {medicine.expiry}</p>
      </div>
      <ActionButton variant="danger" size="sm" onClick={() => onRestock(medicine.id)}>
        Restock
      </ActionButton>
    </div>
  </div>
);

const PharmacyDashboard = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ pendingOrders: 0, packedOrders: 0, deliveredOrders: 0 });
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError('');
        // Mock data for demo
        const fallbackStats = { pendingOrders: 8, packedOrders: 5, deliveredOrders: 12 };
        const fallbackOrders = [
          { id: 'ORD-2001', status: 'pending', customer: 'Ravi Kumar', amount: 450, medicines: ['Atorvastatin 10mg', 'Metformin 500mg'], prescription: 'PR-1101' },
          { id: 'ORD-2002', status: 'pending', customer: 'Neha Sharma', amount: 320, medicines: ['Ibuprofen 400mg'], prescription: 'PR-1102' },
          { id: 'ORD-2003', status: 'pending', customer: 'Imran Ali', amount: 180, medicines: ['Amlodipine 5mg'], prescription: 'PR-1103' },
        ];
        const fallbackAlerts = [
          { id: 'MED-1', name: 'Paracetamol 650mg', stock: 5, expiry: '2024-12-31' },
          { id: 'MED-2', name: 'Amoxicillin 500mg', stock: 2, expiry: '2024-11-15' },
        ];

        if (!mounted) return;
        setStats(fallbackStats);
        setIncomingOrders(fallbackOrders);
        setStockAlerts(fallbackAlerts);
      } catch (e) {
        if (!mounted) return;
        setError('Unable to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [baseUrl]);

  const handleAcceptOrder = (orderId) => {
    console.log('Accepting order:', orderId);
    // API call would go here
  };

  const handleRequestSubstitute = (orderId) => {
    console.log('Requesting substitute for order:', orderId);
    // API call would go here
  };

  const handleRestock = (medicineId) => {
    console.log('Restocking medicine:', medicineId);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🏥 Pharmacy Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage orders, inventory, and serve your customers</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton variant="outline" icon="📦">
              Manage Inventory
            </ActionButton>
            <ActionButton variant="primary" icon="💰">
              Generate Invoice
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
            title="Pending Orders" 
            value={stats.pendingOrders} 
            subtitle="Awaiting processing"
            icon="⏳"
            color="warning"
          />
          <StatCard 
            title="Packed Orders" 
            value={stats.packedOrders} 
            subtitle="Ready for delivery"
            icon="📦"
            color="primary"
          />
          <StatCard 
            title="Delivered Today" 
            value={stats.deliveredOrders} 
            subtitle="Successfully delivered"
            icon="✅"
            color="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Incoming Orders */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">📥 Incoming Orders</h2>
                  <p className="text-gray-600 mt-1">Review and process new orders from patients</p>
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
                ) : incomingOrders.length ? (
                  <div className="space-y-4">
                    {incomingOrders.map(order => (
                      <OrderItem
                        key={order.id}
                        order={order}
                        onAccept={handleAcceptOrder}
                        onRequestSubstitute={handleRequestSubstitute}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No new orders</h3>
                    <p className="text-gray-600">All orders have been processed</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stock Alerts */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">⚠️ Low Stock Alerts</h3>
              </div>
              <div className="p-6">
                {stockAlerts.length ? (
                  <div className="space-y-4">
                    {stockAlerts.map(alert => (
                      <StockAlert
                        key={alert.id}
                        medicine={alert}
                        onRestock={handleRestock}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">✅</div>
                    <p>All medicines in stock</p>
                  </div>
                )}
                <div className="mt-4">
                  <ActionButton variant="outline" size="sm" className="w-full">
                    Manage Inventory
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
                  <ActionButton variant="outline" icon="📦" className="justify-start">
                    Add Medicine
                  </ActionButton>
                  <ActionButton variant="outline" icon="📊" className="justify-start">
                    Sales Report
                  </ActionButton>
                  <ActionButton variant="outline" icon="💬" className="justify-start">
                    Customer Chat
                  </ActionButton>
                  <ActionButton variant="outline" icon="💰" className="justify-start">
                    Revenue Analytics
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

export default PharmacyDashboard;
