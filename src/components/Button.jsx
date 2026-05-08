import React from 'react';
import './Button.css';

/**
 * Reusable Button Component.
 * Supports different variants, sizes, and loading states.
 * 
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {boolean} [props.loading=false] - If true, shows a spinner or disabled state
 * @param {React.ReactNode} props.children
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="btn-spinner"></span> : children}
    </button>
  );
};

export default Button;
