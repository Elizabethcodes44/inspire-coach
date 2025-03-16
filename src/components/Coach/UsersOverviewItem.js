import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersOverviewItem.css';
import ProgressBar from './ProgressBar';
import CustomDate from './CustomDate';
import { ICONS } from '../../global';

function UsersOverviewItem({ idx, task }) {
  const navigate = useNavigate();

  const handleTaskItemClick = () => {
    navigate(`/view-task/${task.id}`, { state: { task: JSON.stringify(task) } });
  }

  return (
    <div className='tasks-overview-item-container' onClick={handleTaskItemClick}>
        <div className='tasks-overview-item-status-icon' style={{ color: task.status.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)'}}>
            {ICONS[task.status.icon]}
            {task.status.label}
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <p className='tasks-overview-item-title' variant='h6'>{idx}. {task.title}</p>
          <div className='tasks-overview-item-details'>
            <div className='tasks-overview-item-dates'>
              <CustomDate classes='tasks-overview-item-date' label='Started' date={task.startedDate} />
              <CustomDate classes='tasks-overview-item-date' label='Last Updated' date={task.lastUpdatedDate} />
              <CustomDate classes='tasks-overview-item-date' label='Due' date={task.dueDate} />
            </div>
            <ProgressBar value={task.percentageComplete} width='100%' />
          </div>
        </div>
    </div>
  );
}

export default UsersOverviewItem;