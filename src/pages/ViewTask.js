import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import './ViewTask.css';
import TextToSpeech from '../components/TextToSpeech';
import CustomDate from '../components/CustomDate';
import { ICONS, getNumSteps, getNumStepsCompleted, getEstimatedTimeCompleted, getTotalEstimatedTime, getTaskCompletionPercentage } from '../global';
import ProgressBar from '../components/ProgressBar';
import TaskStep from '../components/TaskStep';

function ViewTask() {
    const location = useLocation();
    const [task, setTask] = useState(JSON.parse(location.state.task));
    const [totalNumSteps, setTotalNumSteps] = useState(getNumSteps(task));
    const [numStepsCompleted, setNumStepsCompleted] = useState(getNumStepsCompleted(task));
    const [estimatedTimeCompleted, setEstimatedTimeCompleted] = useState(getEstimatedTimeCompleted(task));
    const [totalEstimatedTime, setTotalEstimatedTime] = useState(getTotalEstimatedTime(task));
    const [taskCompletionPercentage, setTaskCompletionPercentage] = useState(getTaskCompletionPercentage(estimatedTimeCompleted, totalEstimatedTime));

    useEffect(() => {
        setTotalNumSteps(getNumSteps(task));
        setNumStepsCompleted(getNumStepsCompleted(task));
        setEstimatedTimeCompleted(getEstimatedTimeCompleted(task));
        setTotalEstimatedTime(getTotalEstimatedTime(task));
        setTaskCompletionPercentage(getTaskCompletionPercentage(estimatedTimeCompleted, totalEstimatedTime));
    }, [task]);

    return (
        <div className='view-task-page-container'>
            <div className='view-task-title-container'>
                <h2 className='view-task-title'><span className='view-task-label'>Task:</span> {task.title}</h2>
                <TextToSpeech text={`Task: ${task.title}`} />
            </div>
            <div className='view-task-details-container'>
                <div className='view-task-status-container'>
                    <div className='view-task-status' style={{ color: task.status.color, backgroundColor: 'var(--colored-text-bg)', borderRadius: 'var(--colored-text-border-radius)' }}>
                        {ICONS[task.status.icon]} {task.status.label}
                    </div>
                    <CustomDate classes='view-task-date' label='Started' date={task.startedDate} />
                    <CustomDate classes='view-task-date' label='Last Updated' date={task.lastUpdatedDate} />
                    <CustomDate classes='view-task-date' label='Due' date={task.dueDate} />
                </div>
                <div className='view-task-steps-container'>
                    <div className='view-task-steps-header'>
                        <h3 className='view-task-steps-title'><span className='view-task-label'>Steps</span> ({numStepsCompleted} of {totalNumSteps} completed)</h3>
                        <ProgressBar value={taskCompletionPercentage} />
                    </div>
                    <div className='view-task-steps'>
                        {Object.entries(task.steps).map(([num, step]) => (
                            <TaskStep key={num} num={num} step={step} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTask;