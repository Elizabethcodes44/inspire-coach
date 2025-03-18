import React from "react";
import { useNavigate } from 'react-router-dom';
import AppLogo from "../../assets/inspire-coach-logo.png";
import { APP_NAME, ICONS, STATUSES } from "../../global";
import "./UserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '@mui/material';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { getNumTasksWithStatus, getUserFullName } from "../../global";

function UserCard({ userTasks }) {
  const navigate = useNavigate();

  const viewUserTasks = () => {
    navigate(`/coach/view-user-tasks/${userTasks.user.id}`, { state: { userTasks: JSON.stringify(userTasks) } });
  }

  return (
    <div id="user-container-bg">
      <div id="user-container">
        <div className="user-header">
          <img
            id="user-app-logo"
            src={AppLogo}
            alt={`${APP_NAME} logo: pink ribbon with green checkmark`}
          />
          <h1 id="user-title">{getUserFullName(userTasks.user)}</h1>
          
        </div>
        <div className="">
          
            <p id="user-description">Total Tasks: {userTasks.tasks.length}</p>
          </div>
          <div className="user-header">
        <div id="user-features-list">
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={ICONS[STATUSES.icon]}
              style={{ color: "var(--purple)" }}
            />
            <div className='tasks-overview-item-status-icon' style={{ color: STATUSES.OVERDUE.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)'}}>
                        {ICONS.faCircleExclamation}
                        
                    </div>
            
                    {getNumTasksWithStatus(userTasks.tasks, STATUSES.OVERDUE.id)} {STATUSES.OVERDUE.label}
          </p>
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={ICONS[STATUSES.icon]}
              style={{ color: "var(--purple)" }}
            />
            <div className='tasks-overview-item-status-icon' style={{ color: STATUSES.DUE_SOON.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)'}}>
                        {ICONS.faClock}
                        
                    </div>
            
                    {getNumTasksWithStatus(userTasks.tasks, STATUSES.DUE_SOON.id)} {STATUSES.DUE_SOON.label}
          </p>
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={ICONS[STATUSES.icon]}
              style={{ color: "var(--purple)" }}
            />
            <div className='tasks-overview-item-status-icon' style={{ color: STATUSES.BEHIND.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)'}}>
                        {ICONS.faCircleExclamation}
                        
                    </div>
            
                    {getNumTasksWithStatus(userTasks.tasks, STATUSES.BEHIND.id)} {STATUSES.BEHIND.label}
          </p>
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={ICONS[STATUSES.icon]}
              style={{ color: "var(--purple)" }}
            />
            <div className='tasks-overview-item-status-icon' style={{ color: STATUSES.ON_TRACK.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)'}}>
                        {ICONS.faCircleCheck}
                        
                    </div>
            
                    {getNumTasksWithStatus(userTasks.tasks, STATUSES.ON_TRACK.id)} {STATUSES.ON_TRACK.label}
          </p>

        <div className="cta-section">
        <p>Last Active: {userTasks.user.lastLoginDate} </p>
         
         <Button id='view' variant="contained" aria-label='Button to execute view user' onClick={viewUserTasks}>View</Button>
         <Button className='contact-btn' variant="contained" aria-label='Button to execute contact use'>
            <FontAwesomeIcon 
              className='' 
              icon={faCommentDots} 
              style={{ color: 'var(--green)' }}
            />
            Contact
          </Button>

         </div>
        </div>
        </div>
      </div>
      
    </div>
    

    
  );
}

export default UserCard;
