import React from 'react';
import './Badge.css';

/**
 * Badge Component.
 * Used for status indicators, counts, and tags.
 * 
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary', 'secondary', 'success', 'danger', 'warning'
 * @param {boolean} [props.pill=false] - If true, the badge will be rounded.
 * @param {React.ReactNode} props.children
 */
const Badge = ({ variant = 'primary', pill = false, children, className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${pill ? 'badge-pill' : ''} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
