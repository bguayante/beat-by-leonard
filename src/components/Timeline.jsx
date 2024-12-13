import React from "react";
import kickSvg from "../resources/svg/kick.svg";
import snareSvg from "../resources/svg/snare.svg";
import metronomeSvg from "../resources/svg/metronome.svg";

const soundOptions = {
  none: null,
  snare: snareSvg,
  kick: kickSvg,
  metronome: metronomeSvg,
};

function Timeline({
  beatsPerMeasure,
  beatSounds,
  filledCircles,
  dropdownVisible,
  handleCircleClick,
  handleBeatSoundChange,
  handleIconClick,
}) {
  return (
    <div className="line-with-circles">
      <div className="line"></div>
      <div className="circles">
        {Array.from({ length: beatsPerMeasure }).map((_, index) => (
          <div key={index} className="circle-container">
            <div
              className={`circle ${filledCircles[index] ? "filled" : ""}`}
              onClick={() => handleCircleClick(index)}
            >
              {beatSounds[index] !== "none" &&
                soundOptions[beatSounds[index]] && (
                  <img
                    src={soundOptions[beatSounds[index]]}
                    alt={beatSounds[index]}
                    className="circle-icon"
                    onClick={() => handleIconClick(index)}
                  />
                )}
            </div>
            {dropdownVisible[index] && (
              <div className="circle-dropdown">
                <div onClick={() => handleBeatSoundChange(index, "none")}>
                  None
                </div>
                <div onClick={() => handleBeatSoundChange(index, "snare")}>
                  Snare
                </div>
                <div onClick={() => handleBeatSoundChange(index, "kick")}>
                  Kick
                </div>
                <div onClick={() => handleBeatSoundChange(index, "metronome")}>
                  Metronome
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
