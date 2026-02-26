import React from 'react';

const Badge = ({ 
  children, 
  variant = 'neutral', 
  className = '' 
}) => {
  const variants = {
    neutral: 'bg-gray-100 text-gray-500 border-gray-100',
    primary: 'bg-aqua-50 text-aqua-600 border-aqua-100/50',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100/50',
    warning: 'bg-amber-50 text-amber-600 border-amber-100/50',
    danger: 'bg-red-50 text-red-600 border-red-100/50',
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
