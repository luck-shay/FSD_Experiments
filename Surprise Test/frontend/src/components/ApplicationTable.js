import React from 'react';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';
import './ApplicationTable.css';

export const ApplicationTable = ({ applications, onEdit, onDelete, loading }) => {
  const getStatusBadgeClass = (status) => {
    const classes = {
      APPLIED: 'badge-blue',
      INTERVIEW: 'badge-purple',
      OFFER: 'badge-green',
      REJECTED: 'badge-red',
    };
    return classes[status] || 'badge-gray';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>No Applications Yet</h3>
          <p>Start adding job applications to track your progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="table-row fade-in">
                <td>
                  <strong>{app.company}</strong>
                </td>
                <td>{app.role}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td>{formatDate(app.appliedDate)}</td>
                <td>
                  <span className="notes-preview">
                    {app.notes ? app.notes.substring(0, 30) + '...' : '-'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit"
                      onClick={() => onEdit(app)}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => onDelete(app.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
