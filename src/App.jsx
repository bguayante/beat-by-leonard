import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import snareSound from "./resources/wav/snare.wav";
import kickSound from "./resources/wav/kick.wav";
import Counter from "./components/Counter";
import useAudio from "./hooks/useAudio";
import Timeline from "./components/Timeline";

function App() {
  const [count, setCount] = useState(1);
  const [tempo, setTempo] = useState(120);
  const [running, setRunning] = useState(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [beatSounds, setBeatSounds] = useState(Array(4).fill("metronome"));
  const [filledCircles, setFilledCircles] = useState(Array(4).fill(false));
  const [dropdownVisible, setDropdownVisible] = useState(Array(4).fill(false));
  const intervalRef = useRef(null);

  const {
    audioContext,
    snareBuffer,
    kickBuffer,
    loadSample,
    playMetronomeTick,
    playSound,
  } = useAudio();

  useEffect(() => {
    loadSample(snareSound, snareBuffer);
    loadSample(kickSound, kickBuffer);
  }, [loadSample, snareBuffer, kickBuffer]);

  const playBeat = (index) => {
    setCount(index + 1);
    switch (beatSounds[index]) {
      case "metronome":
        playMetronomeTick(audioContext, index === 0 ? 880 : 440);
        break;
      case "snare":
        playSound(audioContext, snareBuffer.current);
        break;
      case "kick":
        playSound(audioContext, kickBuffer.current);
        break;
      default:
        break;
    }
  };

  const startSequence = () => {
    let index = 0;
    playBeat(index); // Play the first beat immediately
    const interval = 60000 / tempo;
    intervalRef.current = setInterval(() => {
      index = (index + 1) % beatsPerMeasure;
      playBeat(index);
    }, interval);
  };

  const handleStartStop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
      setCount(1);
    } else {
      setRunning(true);
      startSequence();
    }
  };

  const handleTempoChange = (newTempo) => {
    setTempo(newTempo);
    if (running) {
      clearInterval(intervalRef.current);
      startSequence();
    }
  };

  const handleBeatsPerMeasureChange = (newBPM) => {
    setBeatsPerMeasure(newBPM);
    setBeatSounds(Array(newBPM).fill("metronome"));
    setFilledCircles(Array(newBPM).fill(false));
    setDropdownVisible(Array(newBPM).fill(false));
  };

  const handleBeatSoundChange = (index, sound) => {
    const newBeatSounds = [...beatSounds];
    newBeatSounds[index] = sound;
    setBeatSounds(newBeatSounds);
    const newDropdownVisible = [...dropdownVisible];
    newDropdownVisible[index] = false;
    setDropdownVisible(newDropdownVisible);
  };

  const handleCircleClick = (index) => {
    const newDropdownVisible = [...dropdownVisible];
    newDropdownVisible[index] = !newDropdownVisible[index];
    setDropdownVisible(newDropdownVisible);
  };

  const handleIconClick = (index) => {
    const newBeatSounds = [...beatSounds];
    newBeatSounds[index] = "none";
    setBeatSounds(newBeatSounds);
  };

  return (
    <div className="container">
      <div className="header-space"></div>
      <div className="counter-container">
        <Counter
          tempo={tempo}
          beatsPerMeasure={beatsPerMeasure}
          onTempoChange={handleTempoChange}
          onBeatsPerMeasureChange={handleBeatsPerMeasureChange}
          onStartStop={handleStartStop}
          running={running}
        />
      </div>
      <Timeline
        beatsPerMeasure={beatsPerMeasure}
        beatSounds={beatSounds}
        filledCircles={filledCircles}
        dropdownVisible={dropdownVisible}
        handleCircleClick={handleCircleClick}
        handleBeatSoundChange={handleBeatSoundChange}
        handleIconClick={handleIconClick}
      />
    </div>
  );
}

export default App;
