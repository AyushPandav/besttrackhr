import React, { useState, useRef } from 'react';
import './EmpTimer.css';

function EmpTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const handleSubmit = () => {
    const totalTime = formatTime(time);
    alert(`Total Time Submitted: ${totalTime}`);
    console.log('Total Time:', totalTime);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-card">
        <h1>Employee Work Timer</h1>
        <div className="timer-display">{formatTime(time)}</div>

        <div className="button-group">
          <button className="start-btn" onClick={handleStart} disabled={isRunning}>
            Start
          </button>
          <button className="stop-btn" onClick={handleStop} disabled={!isRunning}>
            Stop
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmpTimer;
