import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Body from './body';

function Timer(props) {

    const totalTime = 3600;
    const [remainingTime, setRemainingTime] = useState(totalTime);
    const [state, setState] = useState('stopped');
    const [intervalId, setIntervalId] = useState(null);
    const [status, setStatus] = useState('Available')
    const [textColor, setTextColor] = useState('text-sky-600')
    const [textStatusColor, setTextStatusColor] = useState('text-green-600')
    const apiAccessToken = 'AXVvVCzla6kaVU+WXxvNRKP1y815hmBoxv7QfdvhQTMKMzUElnQjOW6NULoxsW4ZObzum1Rfrh9fM7U5ucarQt8z9oTqkue9FdJW9QfqUkBZv408bOd2wnsd3ZR79kftsyTpgk/KtTXevBuvnkH2RAdB04t89/1O/w1cDnyilFU='
    const groupId = '1657779528'


    useEffect(() => {
        if (state === 'running') {
            setTextColor('text-red-600')
            setTextStatusColor('text-red-600')
            setStatus('Unavailable')
            const id = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
            setIntervalId(id);
            return () => clearInterval(id);
        }
    }, [state, remainingTime]);

    useEffect(() => {
        if (remainingTime === 0) {
            setRemainingTime(totalTime);
            setState('stopped');
            setStatus('Available')
            setTextColor('text-sky-600')
            setTextStatusColor('text-green-600')
            clearInterval(intervalId);
        }
    }, [remainingTime, totalTime, intervalId]);

    useEffect(() => {
        if (remainingTime <= 10 && remainingTime > 0) {

            axios.post('https://api.line.me/v2/bot/message/push', {
                to: groupId,
                messages: [
                    {
                        type: 'text',
                        text: `Time remaining: ${remainingTime} seconds`
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiAccessToken}`
                }
            });
        }
    }, [remainingTime, apiAccessToken, groupId]);

    useEffect(() => {
        if (state === 'stopped' && remainingTime === 0) {
            axios.post(`http://localhost:4000/wash`)
                .then(response => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                });
        }
    }, [state, remainingTime]);



    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedSeconds = String(seconds).padStart(2, '0');


    function startTimer() {

        setState('running');
        const data = axios.post(`http://localhost:4000/wash`, props)

            .then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error);
            });
    }


    return (
        <div>
            <span>Status :  </span><span className={textStatusColor}>{status}</span>
            <p>Time Count {minutes}:{formattedSeconds}</p>
            <button className={textColor} onClick={startTimer}>{state === 'running' ? 'Washing' : 'Insert Coin'}</button>
        </div>
    )
}
export default Timer;