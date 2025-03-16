import React from "react";
import AppLogo from "../../assets/inspire-coach-logo.png";
import { APP_NAME } from "../../coachGlobal";
import "./UserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS, STATUSES } from "../../coachGlobal";
import { Button } from '@mui/material';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';


function UserCard({ name, totalTasks, overdueTasks, dueSoonTasks, behindTasks, onTrackTasks, lastActive, view, contact }) {
  return (
    <div id="user-container-bg">
      <div id="user-container">
        <div className="user-header">
          <img
            id="user-app-logo"
            src={AppLogo}
            alt={`${APP_NAME} logo: pink ribbon with green checkmark`}
          />
          <h1 id="user-title">{name}</h1>
          
        </div>
        <div className="">
          
            <p id="user-description">Total Tasks: {totalTasks}</p>
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
            
                    {overdueTasks} {STATUSES.OVERDUE.label}
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
            
                    {dueSoonTasks} {STATUSES.DUE_SOON.label}
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
            
            {behindTasks} {STATUSES.BEHIND.label}
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
            
            {onTrackTasks} {STATUSES.ON_TRACK.label}
          </p>

        <div className="cta-section">
        <p>Last Active: {lastActive} </p>
         
         <Button id='view' variant="contained" aria-label='Button to execute view user'>{view}</Button>
         <Button id='contact' variant="contained" aria-label='Button to execute contact use'>
           <FontAwesomeIcon 
                                 className='' 
                                 icon={faCommentDots} 
                                 style={{ color: 'var(--green)' }}
                             /> {contact}</Button>

         </div>
        </div>
        </div>
      </div>
      
    </div>
    

    
  );
}

export default UserCard;
