export type ChallengeType =
  | "tap_count"
  | "double_tap_count"
  | "long_press"
  | "pan"
  | "fling_right"
  | "fling_left"
  | "pinch"
  | "score"
  | "sustained_cps";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  target: number;
  duration?: number;
}

export interface GameState {
  score: number;
  tapCount: number;
  doubleTapCount: number;
  longPressActivated: boolean;
  panActivated: boolean;
  flingRightCount: number;
  flingLeftCount: boolean;
  pinchActivated: boolean;
  sustainedCpsCompleted: boolean;
}

export interface GameContextType extends GameState {
  addScore: (points: number) => void;
  incrementTap: () => void;
  incrementDoubleTap: () => void;
  activateLongPress: () => void;
  activatePan: () => void;
  incrementFlingRight: () => void;
  activateFlingLeft: () => void;
  activatePinch: () => void;
  completeSustainedCps: () => void;
  resetProgress: () => void;
}

export type ThemeType = "light" | "dark";

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}
