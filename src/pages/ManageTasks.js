import React, { useState } from 'react';
import './ManageTasks.css';
import { Typography, TextField, Button, InputAdornment } from '@mui/material';
import TasksOverview from '../components/TasksOverview';
import SpeechToText from '../components/SpeechToText';

function ManageTasks() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (newValue) => {
        console.log('searching...', newValue);
        setSearchQuery(newValue);
    }
  
    return (
        <div id='manage-tasks-container'>
            <div id='manage-tasks-search-bar-container'>
            <SpeechToText setTextCallback={setSearchQuery} />
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
                <Button id='manage-tasks-search-button' variant="contained" aria-label='Button to execute task search' onClick={handleSearch}>Go</Button>
            </div>
            <TasksOverview />
        </div>
  );
}

export default ManageTasks;