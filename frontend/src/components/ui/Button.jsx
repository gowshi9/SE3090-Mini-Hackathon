import React from 'react';

/**
 * Reusable Button component.
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'danger'} [props.variant='primary'] - Visual style variant.
 * @param {boolean} [props.isLoading=false] - Loading state indicator.
 * @param {React.ReactNode} props.children - Button content.
 * @returns {JSX.Element}
 */
export function Button({ variant = 'primary', isLoading = false, children, className = '', disabled, ...props }) {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
    secondary: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500",
    outline: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="animate-spin inline-block mr-2">⏳</span> : null}
      {children}
    </button>
  );
}
