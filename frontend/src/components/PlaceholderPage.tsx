import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, icon = "🚧" }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700 text-sm">
            This feature is coming soon! We're working hard to bring you the best experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
