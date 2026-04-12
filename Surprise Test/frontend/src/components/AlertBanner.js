import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import './AlertBanner.css';

export const AlertBanner = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />;

  return (
    <div className={`alert alert-${type} fade-in`}>
      <div className="alert-content">
        {icon}
        <span>{message}</span>
      </div>
      <button className="alert-close" onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
};
