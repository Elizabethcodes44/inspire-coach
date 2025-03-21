import React, { useState } from 'react';
import './TextToSpeech.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { getAzureSpeechTokenOrRefresh } from '../global';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

function TextToSpeech({ text, language='en-US' }) {
    const [player, updatePlayer] = useState({p: undefined, muted: false});

    const handleTextToSpeech = async () => {
        const tokenObj = await getAzureSpeechTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        const myPlayer = new speechsdk.SpeakerAudioDestination();
        updatePlayer(p => {p.p = myPlayer; return p;});
        const audioConfig = speechsdk.AudioConfig.fromSpeakerOutput(player.p);

        let synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);

        const textToSpeak = text;
        synthesizer.speakTextAsync(
            textToSpeak,
            result => {
                if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log(`synthesis finished for "${textToSpeak}".\n`)
                } else if (result.reason === speechsdk.ResultReason.Canceled) {
                    console.log(`synthesis failed. Error detail: ${result.errorDetails}.\n`);
                }
                synthesizer.close();
                synthesizer = undefined;
            },
            function (err) {
                console.log(`Error: ${err}.\n`);
                synthesizer.close();
                synthesizer = undefined;
            }
        );
    }

    return (
        <button className='text-to-speech-btn' onClick={handleTextToSpeech}>
            <FontAwesomeIcon icon={faVolumeHigh} />
        </button>
    );
}

export default TextToSpeech;