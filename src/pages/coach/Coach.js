import React, { useEffect, useState } from 'react';
import UserCard from '../../components/Coach/UserCard';
import './Coach.css';

// TODO: remove once pulling from DB
import { PLACEHOLDER_TASKS } from '../../components/TasksOverview';
const PLACEHOLDER_USER = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    lastLoginDate: 'Mar 10, 2025'
}
const PLACEHOLDER_USERS_TASKS = [
  {
    user: PLACEHOLDER_USER,
    tasks: PLACEHOLDER_TASKS
  },
  {
    user: PLACEHOLDER_USER,
    tasks: PLACEHOLDER_TASKS
  },
  {
    user: PLACEHOLDER_USER,
    tasks: PLACEHOLDER_TASKS
  }
];
//////////////

function Coach() {
  const [usersTasks, setUsersTasks] = useState([]);
//   useEffect(() => {
//     // Fetch user details from the backend
//     fetch('/api/users')
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

  useEffect(() => {
    // TODO: remove and pull from DB
    setUsersTasks(PLACEHOLDER_USERS_TASKS);
  }, []);

  return (
    <div className="coach-container">
      <div className="filters">
        {/* Add filter options here */}
        <h3>Filters</h3>
      </div>
      <div className="user-card-container">
        {usersTasks.map(userTasks => (
          <UserCard key={userTasks.user.id} userTasks={userTasks} />
        ))}
      </div>
    </div>
  );
}

export default Coach;
