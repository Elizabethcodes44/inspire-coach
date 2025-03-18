import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import './ViewUserTasks.css';
import { getNumTasksWithStatus, getUserFullName, STATUSES, ICONS, getNumSteps, getNumStepsCompleted, getEstimatedTimeCompleted, getTotalEstimatedTime, getTaskCompletionPercentage } from '../../global';
import { Button, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import CustomDate from '../../components/CustomDate';
import TaskStep from '../../components/TaskStep';
import ProgressBar from '../../components/ProgressBar';

function ViewUserTasks() {
    const location = useLocation();
    const [userTasks, setUserTasks] = useState(JSON.parse(location.state.userTasks));

    return (
        <div className='view-user-tasks-container'>
            <h2>{getUserFullName(userTasks.user)}</h2>
            <div className='view-user-tasks-header-container'>
                <p className='view-user-tasks-last-active-date'>Last Active: {userTasks.user.lastLoginDate}</p>
                <Button className='contact-btn' variant="contained" aria-label='Button for coach to contact student'>
                    <FontAwesomeIcon 
                        className='' 
                        icon={faCommentDots} 
                        style={{ color: 'var(--green)' }}
                    />
                    Contact
                </Button>
            </div>
            <div className="view-user-tasks-task-counts">
                <p className='view-user-tasks-task-count'>Total Tasks: {userTasks.tasks.length}</p>
                <div className='view-user-tasks-status-counts'>
                    {
                        Object.entries(STATUSES).map(([_, status]) => {
                        return (
                            <div className='view-user-tasks-status-count' style={{ color: status.color}}>
                                {ICONS[status.icon]} {status.label} ({getNumTasksWithStatus(userTasks.tasks, status.id)})
                            </div>
                        )
                        })
                    }
                </div>
            </div>
            <div className='view-user-tasks-tasks-container'>
                { userTasks.tasks.map((task) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`Task: ${task.title}`}
                                id={`task-${task.id}`}
                                className='view-user-tasks-accordion-summary'
                            >
                                <div className='view-user-tasks-status' style={{ color: task.status.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)' }}>
                                    {ICONS[task.status.icon]} {task.status.label}
                                </div>
                                <p className="view-user-tasks-accordion-header-text">{task.title}</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='view-user-tasks-dates'>
                                    <CustomDate classes='view-task-date' label='Started' date={task.startedDate} />
                                    <CustomDate classes='view-task-date' label='Last Updated' date={task.lastUpdatedDate} />
                                    <CustomDate classes='view-task-date' label='Due' date={task.dueDate} />
                                </div>
                                <div className='view-task-steps-container'>
                                    <div className='view-task-steps-header'>
                                        <h3 className='view-task-steps-title'><span className='view-task-label'>Steps</span> ({getNumStepsCompleted(task)} of {getNumSteps(task)} completed)</h3>
                                        <ProgressBar value={getTaskCompletionPercentage(getEstimatedTimeCompleted(task), getTotalEstimatedTime(task))} />
                                    </div>
                                    <div className='view-task-steps'>
                                        {Object.entries(task.steps).map(([num, step]) => (
                                            <TaskStep key={num} num={num} step={step} />
                                        ))}
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )})
                }
            </div>
        </div>
    );
}

export default ViewUserTasks;