import React, { useState, useEffect } from 'react';

function Body() {

    const [firstWashingMachineStatus, setFirstWashingMachineStatus] = useState('')
    const [secondWashingMachineStatus, setSecondWashingMachineStatus] = useState('')
    const [thirdWashingMachineStatus, setThirdWashingMachineStatus] = useState('')
    const [fourthWashingMachineStatus, setFourthWashingMachineStatus] = useState('')

    const totalTime = 5; // total time in seconds
    const [remainingTime, setRemainingTime] = useState(totalTime);
    const [state, setState] = useState('stopped'); // timer state (running or stopped)
    const [intervalId, setIntervalId] = useState(null); // interval ID

    // Update the remaining time every second when the timer is running
    useEffect(() => {
        if (state === 'running') {
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
            clearInterval(intervalId);
        }
    }, [remainingTime, totalTime, intervalId]);

    // Calculate the minutes and seconds from the remaining time
    const minutes = Math.floor(remainingTime / 5);
    const seconds = remainingTime % 5;

    const formattedSeconds = String(seconds).padStart(2, '0');

    // Start or stop the timer when the switch is clicked
    function toggleTimer() {
        if (state === 'running') {
            setState('stopped');
            clearInterval(intervalId);
        } else {
            setState('running');
        }
    }

    function startTimer() {
        setState('running');
    }

    const data = {
        data: 'images/ic-wash.svg'
    }

    return (
        <div className="flex box-border justify-center bg-sky-300 ">
            <div className=" box-border w-[50em] h-[40em] flex-col flex content-center justify-center bg-white rounded-t-[15px] shadow-[0_-5px_10px_rgba(0,0,0,0.07)]">
                <div className="mb-[1em] flex flex-row justify-around">
                    <div className="flex flex-row mx-[20px]">
                        <img src={data.data} alt="Washing-Machine-1" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 1</p>
                            <p>Status : {firstWashingMachineStatus}</p>
                            <p>Time Count {minutes}:{formattedSeconds}</p>
                            <button className='text-sky-600' onClick={startTimer}>{state === 'running' ? 'Washing' : 'Insert Coin'}</button>
                        </div>

                    </div>
                    <div className="flex">
                        <img src={data.data} alt="Washing-Machine-2" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 2</p>
                            <p>Status : {secondWashingMachineStatus}</p>
                            <p>Time Count :</p>
                            <button className='text-sky-600'>Insert Coin</button>
                        </div>
                    </div>
                </div>
                <div className="mt-[1em] flex flex-row justify-around">
                    <div className="flex">
                        <img src={data.data} alt="Washing-Machine-3" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 3</p>
                            <p>Status : {thirdWashingMachineStatus}</p>
                            <p>Time Count :</p>
                            <button className='text-sky-600'>Insert Coin</button>
                        </div>
                    </div>
                    <div className="flex">
                        <img src={data.data} alt="Washing-Machine-4" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 4</p>
                            <p>Status : {fourthWashingMachineStatus}</p>
                            <p>Time Count :</p>
                            <button className='text-sky-600'>Insert Coin</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Body;