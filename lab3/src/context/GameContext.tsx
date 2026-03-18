import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { GameContextType, GameState } from "../types";

const initialState: GameState = {
  score: 0,
  tapCount: 0,
  doubleTapCount: 0,
  longPressActivated: false,
  panActivated: false,
  flingRightCount: 0,
  flingLeftCount: false,
  pinchActivated: false,
  sustainedCpsCompleted: false,
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>(initialState);

  const addScore = useCallback((points: number) => {
    setState((prev) => ({ ...prev, score: prev.score + points }));
  }, []);

  const incrementTap = useCallback(() => {
    setState((prev) => ({ ...prev, tapCount: prev.tapCount + 1 }));
  }, []);

  const incrementDoubleTap = useCallback(() => {
    setState((prev) => ({ ...prev, doubleTapCount: prev.doubleTapCount + 1 }));
  }, []);

  const activateLongPress = useCallback(() => {
    setState((prev) => {
      if (prev.longPressActivated) return prev;
      return { ...prev, longPressActivated: true };
    });
  }, []);

  const activatePan = useCallback(() => {
    setState((prev) => {
      if (prev.panActivated) return prev;
      return { ...prev, panActivated: true };
    });
  }, []);

  const incrementFlingRight = useCallback(() => {
    setState((prev) => ({
      ...prev,
      flingRightCount: prev.flingRightCount + 1,
    }));
  }, []);

  const activateFlingLeft = useCallback(() => {
    setState((prev) => {
      if (prev.flingLeftCount) return prev;
      return { ...prev, flingLeftCount: true };
    });
  }, []);

  const activatePinch = useCallback(() => {
    setState((prev) => {
      if (prev.pinchActivated) return prev;
      return { ...prev, pinchActivated: true };
    });
  }, []);

  const completeSustainedCps = useCallback(() => {
    setState((prev) => {
      if (prev.sustainedCpsCompleted) return prev;
      return { ...prev, sustainedCpsCompleted: true };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        addScore,
        incrementTap,
        incrementDoubleTap,
        activateLongPress,
        activatePan,
        incrementFlingRight,
        activateFlingLeft,
        activatePinch,
        completeSustainedCps,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameParams = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameParams must be used within a GameProvider");
  }
  return context;
};
