import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component.
 * A central loading indicator with a premium feel.
 * 
 * @param {Object} props
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {string} [props.color='primary'] - 'primary', 'white'
 */
const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  return (
    <div className={`spinner-container spinner-${size} spinner-${color}`}>
      <div className="spinner-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
