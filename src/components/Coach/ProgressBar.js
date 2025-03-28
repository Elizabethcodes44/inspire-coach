import React from 'react';
import './ProgressBar.css';

function ProgressBar({ value, width }) {

  return (
    <div className='progress-bar-container'>
        <span className='progress-bar-label'>Completion:</span>
        <progress className='progress-bar-scale' style={{ width: width }} max={100} value={value} />
        <span className='progress-bar-value-text'>{value}%</span>
    </div>
  );
}

export default ProgressBar;