import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);
  const [tempo, setTempo] = useState(120);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const incCount = () => {
    setCount((prevCount) => (prevCount >= 4 ? 1 : prevCount + 1));
  };

  const handleButtonClick = () => {
    setRunning(!running);
  };

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
