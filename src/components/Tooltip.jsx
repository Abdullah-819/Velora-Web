import React, { useState } from 'react';
import './Tooltip.css';

/**
 * Tooltip Component.
 * A lightweight tooltip implementation.
 * 
 * @param {Object} props
 * @param {string} props.text - The tooltip message.
 * @param {string} [props.position='top'] - 'top', 'bottom', 'left', 'right'
 * @param {React.ReactNode} props.children
 */
const Tooltip = ({ text, position = 'top', children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="tooltip-wrapper" 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`tooltip-bubble tooltip-${position}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
