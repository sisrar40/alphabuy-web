import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  disabled = false, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold font-display transition-standard rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'aqua-btn text-white',
    secondary: 'bg-white border border-gray-100 text-gray-700 hover:bg-gray-50 focus:ring-gray-100 shadow-soft',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 focus:ring-red-500',
    ghost: 'text-gray-600 hover:bg-aqua-50/50 hover:text-aqua-600 focus:ring-aqua-100',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-md shadow-emerald-500/20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
