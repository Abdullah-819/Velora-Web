import React from 'react';
import './EmptyState.css';

/**
 * EmptyState Component.
 * Displays a friendly message when no data is available.
 * 
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} [props.action]
 */
const EmptyState = ({ title, description, icon, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
