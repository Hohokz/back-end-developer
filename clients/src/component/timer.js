import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Body from './body';
import qs from 'qs';

let dataMessage = qs.stringify({
    'message': 'you have 1 min left'
});

function Timer(props) {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer Ur1WwZeWxA91MfQNXzp7BSoayIfjTgts6KJgqGrU918'
        },
        data: dataMessage
    };

    const totalTime = 70;
    const [remainingTime, setRemainingTime] = useState(totalTime);
    const [state, setState] = useState('stopped');
    const [intervalId, setIntervalId] = useState(null);
    const [status, setStatus] = useState('Available')
    const [textColor, setTextColor] = useState('text-sky-600')
    const [textStatusColor, setTextStatusColor] = useState('text-green-600')
    const apiAccessToken = 'Ur1WwZeWxA91MfQNXzp7BSoayIfjTgts6KJgqGrU918'
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
        if (remainingTime <= 60 && remainingTime > 0) {

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.dataMessage));
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    });

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
                console.log(data)
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