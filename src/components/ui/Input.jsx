import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  containerClassName = '', 
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {Icon && (
          <Icon className="absolute left-4 text-gray-400 group-focus-within:text-aqua-500 transition-colors" />
        )}
        <input
          className={`
            w-full py-4 bg-white border border-gray-100 rounded-2xl outline-none transition-standard font-semibold text-gray-900 placeholder-gray-400
            ${Icon ? 'pl-11 pr-4' : 'px-5'}
            ${error 
              ? 'border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500' 
              : 'focus:ring-4 focus:ring-aqua-500/10 focus:border-aqua-500 focus:shadow-premium'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase tracking-tighter">{error}</p>
      )}
    </div>
  );
};

export default Input;
