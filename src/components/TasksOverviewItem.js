import React from 'react';
import './TasksOverviewItem.css';
import ProgressBar from './ProgressBar';

function TasksOverviewItem({ idx, task }) {

  return (
    <div className='tasks-overview-item-container'>
        <div className='tasks-overview-item-status-icon' style={{ color: task.status.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)'}}>
            {task.status.icon}
            {task.status.label}
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <p className='tasks-overview-item-title' variant='h6'>{idx}. {task.title}</p>
          <div className='tasks-overview-item-details'>
            <div className='tasks-overview-item-dates'>
                <p className='tasks-overview-item-date'>Started: {task.startedDate}</p>
                <p className='tasks-overview-item-date'>Last Updated: {task.lastUpdatedDate}</p>
                <p className='tasks-overview-item-date'>Due: {task.dueDate}</p>
            </div>
            <ProgressBar value={task.percentageComplete} />
          </div>
        </div>
    </div>
  );
}

export default TasksOverviewItem;