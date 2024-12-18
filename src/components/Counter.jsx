import React, { useState, useEffect, useRef } from "react";

function Counter({
  tempo,
  beatsPerMeasure,
  onTempoChange,
  onBeatsPerMeasureChange,
  onStartStop,
  running,
}) {
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseDown = (change) => {
    const id = setInterval(() => {
      onTempoChange((prevTempo) => prevTempo + change);
    }, 100);
    setIntervalId(id);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleClick = (change) => {
    onTempoChange(tempo + change);
  };

  useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [intervalId]);

  return (
    <div className="counter">
      <div className="half-circle"></div>
      <div className="controls">
        <select
          value={beatsPerMeasure}
          onChange={(e) => onBeatsPerMeasureChange(Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6, 7, 8].map((value) => (
            <option key={value} value={value}>
              {value} Beats
            </option>
          ))}
        </select>
        <div className="tempo-controls">
          <button
            onClick={() => handleClick(-1)}
            onMouseDown={() => handleMouseDown(-1)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="tempo-inc-dec"
          >
            -
          </button>
          <div className="count">{tempo}</div>
          <button
            onClick={() => handleClick(1)}
            onMouseDown={() => handleMouseDown(1)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="tempo-inc-dec"
          >
            +
          </button>
        </div>
        <button className="startButton" onClick={onStartStop}>
          {running ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default Counter;
