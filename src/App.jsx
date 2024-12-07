import { useState, useRef, useEffect } from "react";
import "./App.css";
import snareSound from "./resources/snare.wav"; // Make sure to import your snare sample

function App() {
  const [count, setCount] = useState(1);
  const [tempo, setTempo] = useState(240);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const snareBufferRef = useRef(null);

  const loadSnareSample = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const response = await fetch(snareSound);
    const arrayBuffer = await response.arrayBuffer();
    snareBufferRef.current = await audioContextRef.current.decodeAudioData(
      arrayBuffer
    );
  };

  const playSnare = () => {
    if (snareBufferRef.current) {
      const snareSource = audioContextRef.current.createBufferSource();
      snareSource.buffer = snareBufferRef.current;
      snareSource.connect(audioContextRef.current.destination);
      snareSource.start();
    }
  };

  const incCount = () => {
    setCount((prevCount) => (prevCount >= 4 ? 1 : prevCount + 1));
    playSnare();
  };

  const handleButtonClick = () => {
    setRunning(!running);
  };

  useEffect(() => {
    loadSnareSample();
  }, []);

  useEffect(() => {
    if (running) {
      const interval = 60000 / tempo;
      intervalRef.current = setInterval(() => {
        incCount();
      }, interval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, tempo]);

  return (
    <>
      <div className="counter">
        <div className="count">{count}</div>
        <div className="button">
          <button onClick={handleButtonClick}>
            {running ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
