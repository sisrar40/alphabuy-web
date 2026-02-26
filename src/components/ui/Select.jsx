import React from 'react';

const Select = ({ 
  label, 
  error, 
  options = [], 
  className = '', 
  containerClassName = '', 
  ...props 
}) => {
  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          className={`
            w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all font-medium text-gray-900 appearance-none
            ${error 
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
              : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white'}
            ${className}
          `}
          {...props}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 pointer-events-none text-gray-400">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      {error && (
        <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};

export default Select;
