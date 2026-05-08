import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';

/**
 * Toast Component.
 * Temporary notifications that appear on the screen.
 * 
 * @param {Object} props
 * @param {string} props.message
 * @param {string} [props.type='info'] - 'info', 'success', 'error', 'warning'
 * @param {number} [props.duration=3000]
 * @param {Function} props.onClose
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div className={`toast-container toast-${type}`} onClick={onClose}>
      <div className="toast-icon">
        {type === 'success' && <i className="ri-checkbox-circle-line"></i>}
        {type === 'error' && <i className="ri-error-warning-line"></i>}
        {type === 'warning' && <i className="ri-alert-line"></i>}
        {type === 'info' && <i className="ri-information-line"></i>}
      </div>
      <div className="toast-message">{message}</div>
    </div>,
    document.body
  );
};

export default Toast;
