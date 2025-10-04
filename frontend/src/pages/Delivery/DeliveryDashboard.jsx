import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ActionButton from '../../components/ui/ActionButton';

const DeliveryItem = ({ delivery, onStartNavigation, onMarkPicked, onMarkDelivered }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-medical transition-all duration-200">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-gray-900">Order #{delivery.id}</h3>
          <StatusBadge status={delivery.status} />
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">From:</span> {delivery.pharmacy} • 
          <span className="font-medium ml-1">To:</span> {delivery.customer}
        </div>
        <div className="text-sm text-gray-700 mb-3">
          <span className="font-medium">Distance:</span> {delivery.distance} • 
          <span className="font-medium ml-1">ETA:</span> {delivery.eta}
        </div>
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <span className="font-medium">Address:</span> {delivery.address}
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <ActionButton variant="primary" size="sm" onClick={() => onStartNavigation(delivery.id)}>
          Navigate
        </ActionButton>
        <ActionButton variant="success" size="sm" onClick={() => onMarkPicked(delivery.id)}>
          Mark Picked
        </ActionButton>
        <ActionButton variant="success" size="sm" onClick={() => onMarkDelivered(delivery.id)}>
          Mark Delivered
        </ActionButton>
      </div>
    </div>
  </div>
);

const EarningsCard = ({ period, amount, deliveries }) => (
  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{period}</h4>
        <p className="text-lg font-bold text-green-600">₹{amount}</p>
        <p className="text-xs text-gray-500">{deliveries} deliveries</p>
      </div>
      <div className="text-green-500 text-2xl">💰</div>
    </div>
  </div>
);

const DeliveryDashboard = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ assigned: 0, delivered: 0, earnings: 0 });
  const [assignedDeliveries, setAssignedDeliveries] = useState([]);
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError('');
        // Mock data for demo
        const fallbackStats = { assigned: 15, delivered: 12, earnings: 450 };
        const fallbackDeliveries = [
          { id: 'ORD-3001', status: 'assigned', pharmacy: 'City Pharmacy', customer: 'Ravi Kumar', distance: '2.3km', eta: '15 mins', address: '123 MG Road, Jaipur' },
          { id: 'ORD-3002', status: 'picked', pharmacy: 'MedPlus', customer: 'Neha Sharma', distance: '1.8km', eta: '12 mins', address: '456 Park Street, Jaipur' },
          { id: 'ORD-3003', status: 'assigned', pharmacy: 'Apollo Pharmacy', customer: 'Imran Ali', distance: '3.2km', eta: '20 mins', address: '789 Station Road, Jaipur' },
        ];
        const fallbackEarnings = [
          { period: 'Today', amount: 450, deliveries: 12 },
          { period: 'This Week', amount: 2800, deliveries: 65 },
          { period: 'This Month', amount: 11200, deliveries: 280 },
        ];

        if (!mounted) return;
        setStats(fallbackStats);
        setAssignedDeliveries(fallbackDeliveries);
        setEarnings(fallbackEarnings);
      } catch (e) {
        if (!mounted) return;
        setError('Unable to load dashboard data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [baseUrl]);

  const handleStartNavigation = (deliveryId) => {
    console.log('Starting navigation for delivery:', deliveryId);
    // Open maps app or navigation
  };

  const handleMarkPicked = (deliveryId) => {
    console.log('Marking delivery as picked:', deliveryId);
    // API call would go here
  };

  const handleMarkDelivered = (deliveryId) => {
    console.log('Marking delivery as delivered:', deliveryId);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🚚 Delivery Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage deliveries, track earnings, and serve customers</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton variant="outline" icon="📍">
              Live Location
            </ActionButton>
            <ActionButton variant="primary" icon="💰">
              View Earnings
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
            title="Assigned Deliveries" 
            value={stats.assigned} 
            subtitle="Ready to deliver"
            icon="📦"
            color="primary"
          />
          <StatCard 
            title="Delivered Today" 
            value={stats.delivered} 
            subtitle="Successfully completed"
            icon="✅"
            color="success"
          />
          <StatCard 
            title="Today's Earnings" 
            value={`₹${stats.earnings}`} 
            subtitle="Total income"
            icon="💰"
            color="medical"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Assigned Deliveries */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">🚚 Assigned Deliveries</h2>
                  <p className="text-gray-600 mt-1">Pick up medicines and deliver to customers</p>
                </div>
                <ActionButton variant="outline" size="sm">
                  View All Deliveries
                </ActionButton>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-gray-600">Loading deliveries...</span>
                  </div>
                ) : assignedDeliveries.length ? (
                  <div className="space-y-4">
                    {assignedDeliveries.map(delivery => (
                      <DeliveryItem
                        key={delivery.id}
                        delivery={delivery}
                        onStartNavigation={handleStartNavigation}
                        onMarkPicked={handleMarkPicked}
                        onMarkDelivered={handleMarkDelivered}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No deliveries assigned at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">💰 Earnings</h3>
              </div>
              <div className="p-6">
                {earnings.length ? (
                  <div className="space-y-4">
                    {earnings.map(earning => (
                      <EarningsCard
                        key={earning.period}
                        period={earning.period}
                        amount={earning.amount}
                        deliveries={earning.deliveries}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">💰</div>
                    <p>No earnings data</p>
                  </div>
                )}
                <div className="mt-4">
                  <ActionButton variant="outline" size="sm" className="w-full">
                    View Detailed Report
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
                  <ActionButton variant="outline" icon="📍" className="justify-start">
                    Share Location
                  </ActionButton>
                  <ActionButton variant="outline" icon="📞" className="justify-start">
                    Contact Customer
                  </ActionButton>
                  <ActionButton variant="outline" icon="📊" className="justify-start">
                    Performance Stats
                  </ActionButton>
                  <ActionButton variant="outline" icon="⚙️" className="justify-start">
                    Profile Settings
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

export default DeliveryDashboard;
