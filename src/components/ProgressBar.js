import React from 'react';
import './ProgressBar.css';

function ProgressBar({ value }) {

  return (
    <div className='progress-bar-container'>
        <span className='progress-bar-label'>Completion:</span>
        <progress className='progress-bar-scale' max={100} value={value} />
        <span className='progress-bar-value-text'>{value}%</span>
    </div>
  );
}

export default ProgressBar;