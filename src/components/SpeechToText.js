import React from 'react';
import './SpeechToText.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { getAzureSpeechTokenOrRefresh } from '../global';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

function SpeechToText({ setTextCallback, language='en-US' }) {

    const handleSpeechToText = async () => {
        const tokenObj = await getAzureSpeechTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = language;
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            if (result.reason === ResultReason.RecognizedSpeech) {
                setTextCallback(result.text);
            } else {
                console.log('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
            }
        });
    }

    return (
        <button className='speech-to-text-btn' aria-label='Speech-to-text button for task search field' onClick={handleSpeechToText}>
            <FontAwesomeIcon 
                className='search-bar-speech-to-text-icon' 
                icon={faMicrophone} 
                style={{ color: 'var(--primary-text-color)' }}
            /> 
        </button>
    );
}

export default SpeechToText;