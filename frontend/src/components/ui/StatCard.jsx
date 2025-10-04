import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'primary',
  trend,
  trendValue 
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 border-primary-200 text-primary-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    medical: 'bg-medical-50 border-medical-200 text-medical-700',
  };

  const iconClasses = {
    primary: 'text-primary-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    medical: 'text-medical-500',
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${colorClasses[color]} shadow-soft hover:shadow-medical transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? '↗' : '↘'} {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`text-2xl ${iconClasses[color]} opacity-80`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
