import { useState, useEffect, useRef, useCallback } from 'react';

export default function useTimer(initialSeconds, { onExpire, autoStart = false } = {}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  const onExpireRef = useRef(onExpire);
  const endTimeRef = useRef(null);

  onExpireRef.current = onExpire;

  const start = useCallback(() => {
    endTimeRef.current = Date.now() + seconds * 1000;
    setIsRunning(true);
  }, [seconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newSeconds) => {
    setIsRunning(false);
    setSeconds(newSeconds ?? initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      setSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        onExpireRef.current?.();
      }
    }, 250);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const isWarning = seconds > 0 && seconds <= 300;
  const isDanger = seconds > 0 && seconds <= 60;

  return { seconds, isRunning, isWarning, isDanger, start, pause, reset };
}
