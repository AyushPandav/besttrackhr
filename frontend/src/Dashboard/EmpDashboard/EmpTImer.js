import React, { useState, useRef } from "react";
import axios from "axios";
import "./EmpTimer.css";

function EmpTimer() {
  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Start timer
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // Stop timer
  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  // Reset timer
  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  // Format time
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Submit data to MockAPI
  const handleSubmit = async () => {
    const totalTime = formatTime(time);

    if (!name.trim()) {
      alert("⚠️ Please enter your full name before submitting!");
      return;
    }

    try {
      await axios.post("https://6908f1ab2d902d0651b237fc.mockapi.io/Work-timer", {
        name,
        workedTime: totalTime,
      });
      alert(`✅ Work time submitted successfully!\nName: ${name}\nTime: ${totalTime}`);
      console.log("Submitted Data:", { name, workedTime: totalTime });

      // Reset everything
      setName("");
      handleReset();
    } catch (error) {
      console.error("❌ Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="timer-container">
      <div className="timer-card">
        <h1>Employee Work Timer</h1>

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />

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
