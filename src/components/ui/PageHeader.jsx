import React from 'react';

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 font-medium mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
