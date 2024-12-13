import React from "react";

function Counter({ count, running, onClick }) {
  return (
    <div className="counter">
      <div className="count" onClick={onClick}>
        {!running ? <span className="clickStart">Click To Start</span> : count}
      </div>
    </div>
  );
}

export default Counter;
