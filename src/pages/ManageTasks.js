import React, { useState } from 'react';
import './ManageTasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Typography, TextField, Button, InputAdornment } from '@mui/material';
import TasksOverview from '../components/TasksOverview';

function ManageTasks() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (newValue) => {
        console.log(newValue);
        setSearchQuery(newValue);
    }
  
  return (
    <div id='manage-tasks-container'>
        <div id='manage-tasks-search-bar-container'>
            <Typography id='manage-tasks-search-bar-prompt' variant='h4'>Help me with...</Typography>
            <TextField 
                id="manage-tasks-search-bar" 
                variant="outlined" 
                slotProps={{
                    input: {
                        endAdornment: (
                        <InputAdornment position="end">
                            <Button aria-label='Speech-to-text button for task search field'>
                                <FontAwesomeIcon 
                                    className='search-bar-speech-to-text-icon' 
                                    icon={faMicrophone} 
                                    style={{ color: 'var(--primary-text-color)' }}
                                /> 
                            </Button>
                        </InputAdornment>
                        ),
                    },
                }}
            />
            <Button id='manage-tasks-search-button' variant="contained" aria-label='Button to execute task search'>Go</Button>
        </div>
        <TasksOverview />
    </div>
  );
}

export default ManageTasks;