import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import './ViewTask.css';
import TextToSpeech from '../components/TextToSpeech';
import CustomDate from '../components/CustomDate';
import { ICONS } from '../global';
import ProgressBar from '../components/ProgressBar';
import TaskStep from '../components/TaskStep';

function ViewTask() {
    const location = useLocation();
    const [task, setTask] = useState(JSON.parse(location.state.task));

    const getNumSteps = () => {
        return Object.keys(task.steps).length;
    }

    const getNumStepsCompleted = () => {
        let numStepsCompleted = 0;

        Object.entries(task.steps).forEach(([_, step]) => {
            if (step.isCompleted) {
                numStepsCompleted++;
            }
        });

        return numStepsCompleted;
    }

    const getTaskCompletionPercentage = () => {
        return Math.round((getNumStepsCompleted() / getNumSteps()) * 100);
    }

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
                        <h3 className='view-task-steps-title'><span className='view-task-label'>Steps</span> ({getNumStepsCompleted()} of {getNumSteps()} completed)</h3>
                        <ProgressBar value={getTaskCompletionPercentage()} />
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