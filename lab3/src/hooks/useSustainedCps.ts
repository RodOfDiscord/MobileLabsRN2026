import { useCallback, useEffect, useRef, useState } from "react";
import { useGameParams } from "../context/GameContext";

const CPS_THRESHOLD = 3;
const REQUIRED_MS = 10_000;
const TICK_MS = 200;

export function useSustainedCps() {
  const { sustainedCpsCompleted, completeSustainedCps } = useGameParams();

  const tapTimestamps = useRef<number[]>([]);
  const sustainedMs = useRef(0);

  const [progress, setProgress] = useState(0);
  const [currentCps, setCurrentCps] = useState(0);

  const completeFn = useRef(completeSustainedCps);
  useEffect(() => {
    completeFn.current = completeSustainedCps;
  }, [completeSustainedCps]);

  const registerTap = useCallback(() => {
    tapTimestamps.current.push(Date.now());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      tapTimestamps.current = tapTimestamps.current.filter(
        (t) => now - t <= 1000,
      );
      const cps = tapTimestamps.current.length;
      setCurrentCps(cps);

      if (!sustainedCpsCompleted) {
        if (cps >= CPS_THRESHOLD) {
          sustainedMs.current = Math.min(
            sustainedMs.current + TICK_MS,
            REQUIRED_MS,
          );
          setProgress(sustainedMs.current);

          if (sustainedMs.current >= REQUIRED_MS) {
            completeFn.current();
          }
        } else {
          if (sustainedMs.current !== 0) {
            sustainedMs.current = 0;
            setProgress(0);
          }
        }
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [sustainedCpsCompleted]);

  return {
    registerTap,
    progress,
    currentCps,
    isCompleted: sustainedCpsCompleted,
    requiredMs: REQUIRED_MS,
  };
}
