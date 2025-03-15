import React from 'react';
import './TextToSpeech.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function TextToSpeech({ text, language='en-US' }) {
    const handleTextToSpeech = () => {
        console.log('Text to speech clicked: text=', text);
    }

    return (
        <button className='speech-to-text-btn' onClick={handleTextToSpeech}>
            <FontAwesomeIcon icon={faVolumeHigh} />
        </button>
    );
}

export default TextToSpeech;