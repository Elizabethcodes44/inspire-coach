import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user details from the backend
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="manage-users-container">
      <div className="filters">
        {/* Add filter options here */}
        <h3>Filters</h3>
      </div>
      <div className="user-card-container">
        {users.map(user => (
          <UserCard
            key={user.id}
            title={user.title}
            description={user.description}
            details={user.details}
          />
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
