import React from 'react';
import './Skeleton.css';

/**
 * Skeleton Loader Component.
 * Used for placeholder loading states.
 * 
 * @param {Object} props
 * @param {string} [props.width='100%']
 * @param {string} [props.height='20px']
 * @param {string} [props.variant='text'] - 'text', 'circular', 'rectangular'
 */
const Skeleton = ({ width = '100%', height = '20px', variant = 'text' }) => {
  return (
    <div 
      className={`skeleton skeleton-${variant}`} 
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
