import React from 'react';
import './UserTable.css';

const UserTable = ({ users, loading, error, onRetry ,onDelete }) => {
  if (loading) {
    return (
      <div className="table-container">
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="error-message">
          <p>{error}</p>
          {onRetry && (
            <button className="retry-button" onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-message">No users found</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company?.name || 'N/A'}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => onDelete && onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
