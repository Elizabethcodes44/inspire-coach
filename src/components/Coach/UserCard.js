import React from "react";
import AppLogo from "../../assets/inspire-coach-logo.png";
import { APP_NAME } from "../../coachGlobal";
import "./UserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faCalendarCheck,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { ICONS, STATUSES } from "../../coachGlobal";
import { Checkbox, FormControlLabel } from '@mui/material';


function UserCard({ name, totalTasks, overdueTasks, dueSoonTasks, behindTasks, onTrackTasks }) {
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
        <div className="user-header">
          
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
        </div>
        </div>
      </div>
      
    </div>
    

    
  );
}

export default UserCard;
