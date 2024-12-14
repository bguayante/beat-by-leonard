import React from "react";

function BeatsPerMeasureControl({ beatsPerMeasure, onBeatsPerMeasureChange }) {
  return (
    <div className="controls">
      <label>
        Beats Per Measure:
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
      </label>
    </div>
  );
}

export default BeatsPerMeasureControl;
