import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, deleteUser } from '../../services/api';
import UserTable from '../../components/usertable/Usertable';
import UserForm from '../../components/userform/Userform';
import './UserPage.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await getUsers();
    
    if (result.success) {
      setUsers(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (userData) => {
    setSubmitting(true);
    setSuccessMessage('');
    setError(null);

    const result = await createUser(userData);

    if (result.success) {
      const newUser = {
        ...result.data,
        ...userData,
        id: users.length + 1,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setSuccessMessage('User added successfully!');
      
     
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } else {
      setError(result.error);
    }

    setSubmitting(false);
  };

  const handleRetry = () => {
    fetchUsers();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId);
    
    if (result.success) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSuccessMessage('User deleted successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.toLowerCase().includes(searchLower) ||
      (user.company?.name || '').toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="user-page">
      <header className="page-header">
        <h1>User Management Dashboard</h1>
      </header>

      <div className="page-content">
        <div className="form-section">
          <UserForm onSubmit={handleAddUser} isLoading={submitting} />
          
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          
          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="close-button">
                ×
              </button>
            </div>
          )}
        </div>

        <div className="table-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          
          <UserTable
            users={filteredUsers}
            loading={loading}
            error={error && !users.length ? error : null}
            onRetry={handleRetry}
            onDelete={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
