import React from "react";

function TempoControl({ tempo, onTempoChange }) {
  return (
    <div className="controls">
      <label>
        Tempo:
        <input
          type="number"
          value={tempo}
          onChange={(e) => onTempoChange(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export default TempoControl;
