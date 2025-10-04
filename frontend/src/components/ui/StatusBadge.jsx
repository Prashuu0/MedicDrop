import React from 'react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⏳',
      text: 'Pending'
    },
    approved: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '✅',
      text: 'Approved'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '❌',
      text: 'Rejected'
    },
    processing: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '🔄',
      text: 'Processing'
    },
    delivered: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '📦',
      text: 'Delivered'
    },
    'in-transit': {
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: '🚚',
      text: 'In Transit'
    },
    active: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '🟢',
      text: 'Active'
    },
    inactive: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: '⚫',
      text: 'Inactive'
    },
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.color} ${sizeClasses[size]}`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
};

export default StatusBadge;
