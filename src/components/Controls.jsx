import React from "react";

function Controls({
  tempo,
  beatsPerMeasure,
  onTempoChange,
  onBeatsPerMeasureChange,
}) {
  return (
    <div className="controls">
      <label>
        Tempo
        <input
          type="number"
          value={tempo}
          onChange={(e) => onTempoChange(Number(e.target.value))}
          min="1"
          max="300"
          placeholder="Custom BPM"
        />
      </label>
      <label>
        Beats Per Measure
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

export default Controls;
