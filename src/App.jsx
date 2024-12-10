import { useState, useRef, useEffect } from "react";
import "./App.css";
import snareSound from "./resources/snare.wav";
import kickSound from "./resources/kick.wav";

function App() {
  const [count, setCount] = useState(1);
  const [tempo, setTempo] = useState(120);
  const [running, setRunning] = useState(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [beatSounds, setBeatSounds] = useState(Array(4).fill("metronome"));
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const snareBufferRef = useRef(null);
  const kickBufferRef = useRef(null);

  const loadSample = async (url, bufferRef) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    bufferRef.current = await audioContextRef.current.decodeAudioData(
      arrayBuffer
    );
  };

  const playMetronomeTick = (frequency) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const duration = 0.05;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextRef.current.currentTime
    );
    gainNode.gain.setValueAtTime(1, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContextRef.current.currentTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const playSound = (buffer) => {
    if (buffer) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start();
    }
  };

  const playSequence = () => {
    const interval = 60000 / tempo;
    let index = 0;
    intervalRef.current = setInterval(() => {
      index = (index + 1) % beatsPerMeasure;
      if (beatSounds[index] === "metronome") {
        playMetronomeTick(index === 0 ? 880 : 440);
      } else if (beatSounds[index] === "snare") {
        playSound(snareBufferRef.current);
      } else if (beatSounds[index] === "kick") {
        playSound(kickBufferRef.current);
      }
      setCount(index + 1);
    }, interval);
  };

  const handleButtonClick = () => {
    if (running) {
      setRunning(false);
      clearInterval(intervalRef.current);
      setCount(1);
    } else {
      setRunning(true);
      if (beatSounds[0] === "metronome") {
        playMetronomeTick(880);
      } else if (beatSounds[0] === "snare") {
        playSound(snareBufferRef.current);
      } else if (beatSounds[0] === "kick") {
        playSound(kickBufferRef.current);
      }
      playSequence();
    }
  };

  const handleTempoChange = (event) => {
    setTempo(Number(event.target.value));
  };

  const handleBeatsPerMeasureChange = (event) => {
    const newBeatsPerMeasure = Number(event.target.value);
    setBeatsPerMeasure(newBeatsPerMeasure);
    setBeatSounds(Array(newBeatsPerMeasure).fill("metronome"));
  };

  const handleBeatSoundChange = (index, event) => {
    const newBeatSounds = [...beatSounds];
    newBeatSounds[index] = event.target.value;
    setBeatSounds(newBeatSounds);
  };

  useEffect(() => {
    loadSample(snareSound, snareBufferRef);
    loadSample(kickSound, kickBufferRef);
  }, []);

  useEffect(() => {
    if (running) {
      clearInterval(intervalRef.current);
      playSequence();
    }
  }, [running, tempo]);

  return (
    <>
      <div className="counter">
        <div className="count">
          {count < 1 ? <span className="clickStart">Click Start</span> : count}
        </div>
        <div className="controls">
          <button onClick={handleButtonClick}>
            {running ? "Stop" : "Start"}
          </button>
          <input
            type="number"
            value={tempo}
            onChange={handleTempoChange}
            min="1"
            max="300"
            placeholder="Custom BPM"
          />
          <select
            value={beatsPerMeasure}
            onChange={handleBeatsPerMeasureChange}
          >
            {[2, 3, 4, 5, 6, 7, 8].map((value) => (
              <option key={value} value={value}>
                {value} Beats
              </option>
            ))}
          </select>
          {beatSounds.map((sound, index) => (
            <select
              key={index}
              value={sound}
              onChange={(event) => handleBeatSoundChange(index, event)}
            >
              <option value="snare">Snare</option>
              <option value="kick">Kick</option>
              <option value="metronome">Metronome</option>
            </select>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
