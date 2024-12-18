import React, { useState, useEffect } from "react";

function Counter({
  tempo,
  beatsPerMeasure,
  onTempoChange,
  onBeatsPerMeasureChange,
  onStartStop,
  running,
  onTapTempo,
}) {
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseDown = (change) => {
    const id = setInterval(() => {
      onTempoChange((prevTempo) => prevTempo + change);
    }, 80);
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
          {[...Array(15).keys()].map((value) => (
            <option key={value + 2} value={value + 2}>
              {value + 2} Beats
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
          <div className="count" onClick={onTapTempo}>{tempo}</div>
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
