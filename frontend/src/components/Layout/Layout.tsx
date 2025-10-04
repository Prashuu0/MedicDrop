import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  userRole: 'patient' | 'doctor' | 'pharmacy' | 'delivery' | 'admin';
}

const Layout: React.FC<LayoutProps> = ({ userRole }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">MedicDrop</span>
              <span className="text-sm text-gray-500 ml-2">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome back!</span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to your {userRole} panel. This is where you'll manage your activities.
          </p>
          
          {/* Coming Soon Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              🚧 Coming Soon!
            </h2>
            <p className="text-blue-700">
              We're working hard to bring you the complete {userRole} dashboard experience. 
              Stay tuned for updates!
            </p>
          </div>
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
