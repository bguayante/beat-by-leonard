import { useRef } from "react";

function useAudio() {
  const audioContextRef = useRef(null);
  const snareBuffer = useRef(null);
  const kickBuffer = useRef(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const loadSample = async (url, bufferRef) => {
    const audioContext = getAudioContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    bufferRef.current = await audioContext.decodeAudioData(arrayBuffer);
  };

  const playMetronomeTick = (audioContext, frequency) => {
    const duration = 0.05;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.currentTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const playSound = (audioContext, buffer) => {
    if (buffer) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    }
  };

  return {
    audioContext: getAudioContext(),
    snareBuffer,
    kickBuffer,
    loadSample,
    playMetronomeTick,
    playSound,
  };
}

export default useAudio;
