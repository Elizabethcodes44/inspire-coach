import React, { useEffect, useState } from 'react';
import UserCard from '../../components/Coach/UserCard';
import './ManageUsers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Typography, TextField, Button, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UsersOverview from '../../components/Coach/UsersOverview';
import SpeechToText from '../../components/SpeechToText';

function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch user details from the backend
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (newValue) => {
    console.log(newValue);
    setSearchQuery(newValue);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div id='manage-tasks-container'>
        <div id='manage-tasks-search-bar-container'>
            <Typography id='manage-tasks-search-bar-prompt' variant='h4'>Help me with...</Typography>
            <TextField 
                id="manage-tasks-search-bar" 
                variant="outlined" 
                value={searchQuery}
                onChange={newQuery => setSearchQuery(newQuery.target.value)}
                slotProps={{
                    input: {
                        endAdornment: (
                        <InputAdornment position="end">
                          <SpeechToText setTextCallback={setSearchQuery} />
                        </InputAdornment>
                        ),
                    },
                }}
            />
            <Button id='manage-tasks-search-button' variant="contained" aria-label='Button to execute task search'>Go</Button>
        </div>
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
        <UsersOverview />
    </div>
  );
}

export default ManageUsers;