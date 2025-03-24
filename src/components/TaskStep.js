import React, { useState } from 'react';
import './TaskStep.css';
import { Checkbox } from '@mui/material';
import TextToSpeech from './TextToSpeech';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { convertTime } from '../global';

function TaskStep({ num, step }) {
    const [isStepCompleted, setIsStepCompleted] = useState(step.isCompleted);

    const handleStepCompletionChange = () => {
        setIsStepCompleted(!isStepCompleted);
        console.log(`Step ${num} completion changed: isCompleted=${!step.isCompleted}`);
    }

    return (
        <div className='task-step-container'>
            <div className='task-step-header-container'>
                <Checkbox 
                    className='task-step-checkbox'
                    aria-label={`Task step ${num}: ${step.title}, ${step.isCompleted ? 'completed' : 'not completed'}`}
                    sx={{ fontSize: 'var(--default-font-size)', textTransform: 'none', margin: '0 20px' }}
                    checked={isStepCompleted}
                    onChange={() => handleStepCompletionChange()}
                    size='large'
                    icon={<FontAwesomeIcon icon={faSquare} fontSize={30} style={{ color: 'var(--primary-text-color', margin: '0 8px' }} />}
                />
                <p className='task-step-num'>{num}. </p>
                <TextToSpeech text={`Step ${num}, ${step.title}, estimated completion time is ${convertTime(step.estimatedCompletionTime)}`} />
                <p className='task-step-title'>{step.title}</p>
                <p className='task-step-estimated-completion'>(estimated completion time: {convertTime(step.estimatedCompletionTime)})</p>
            </div>
            <div className='task-step-description-container'>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <TextToSpeech text={`Description: ${step.description}`} />
                    <p className='task-step-description'>{step.description}</p>
                </div>
                <img className='task-step-image' src={step.linkToImage} alt={`image representing ${step.title}`} />
            </div>
        </div>
    );
}

export default TaskStep;