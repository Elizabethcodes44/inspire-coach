import React, { useEffect, useState } from 'react';
import UserCard from '../../components/Coach/UserCard';
import './Coach.css';

function Coach() {
  const [users, setUsers] = useState([]);
//   useEffect(() => {
//     // Fetch user details from the backend
//     fetch('/api/users')
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

  useEffect(() => {
    // Use dummy data for users
    const dummyUsers = [
      {
        id: 1,
        name: 'John Doe',
        totalTasks: 7,
        overdueTasks: 1,
        dueSoonTasks: 2,
        behindTasks: 5,
        onTrackTasks: 1,
        lastActive: "March 1, 2025"
      },
      {
        id: 2,
        name: 'Jane Smith',
        totalTasks: 5,
        overdueTasks: 2,
        dueSoonTasks: 1,
        behindTasks: 5,
        onTrackTasks: 1,
        lastActive: "March 4, 2025"
      },
      {
        id: 3,
        name: 'Alice Johnson',
        totalTasks: 10,
        overdueTasks: 2,
        dueSoonTasks: 3,
        behindTasks: 5,
        onTrackTasks: 1,
        lastActive: "March 13, 2025"
      }
    ];
    setUsers(dummyUsers);
  }, []);

  return (
    <div className="coach-container">
      <div className="filters">
        {/* Add filter options here */}
        <h3>Filters</h3>
      </div>
      <div className="user-card-container">
        {users.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            totalTasks={user.totalTasks}
            overdueTasks={user.overdueTasks}
            dueSoonTasks={user.dueSoonTasks}
            behindTasks={user.behindTasks}
            onTrackTasks={user.onTrackTasks}
            lastActive={user.lastActive}
            view={"view"}
            contact={"contact"}
          />
        ))}
      </div>
    </div>
  );
}

export default Coach;
