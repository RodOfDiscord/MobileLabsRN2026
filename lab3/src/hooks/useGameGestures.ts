import { useCallback } from "react";
import { Directions, Gesture } from "react-native-gesture-handler";
import { useGameParams } from "../context/GameContext";
import {
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export function useGameGestures(onTapForCps?: () => void) {
  const {
    addScore,
    incrementTap,
    incrementDoubleTap,
    activateLongPress,
    activatePan,
    incrementFlingRight,
    activateFlingLeft,
    activatePinch,
  } = useGameParams();

  // Separate scale values: tap feedback vs pinch scale
  const tapScale = useSharedValue(1);
  const pinchScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  // --- JS handlers ---

  const handleTap = useCallback(() => {
    addScore(1);
    incrementTap();
    onTapForCps?.();
  }, [addScore, incrementTap, onTapForCps]);

  const handleDoubleTap = useCallback(() => {
    addScore(2);
    incrementDoubleTap();
    onTapForCps?.();
  }, [addScore, incrementDoubleTap, onTapForCps]);

  const handleLongPress = useCallback(() => {
    addScore(5);
    activateLongPress();
  }, [addScore, activateLongPress]);

  const handlePanActive = useCallback(() => {
    activatePan();
  }, [activatePan]);

  const handleFlingRight = useCallback(() => {
    addScore(Math.floor(Math.random() * 10) + 1);
    incrementFlingRight();
  }, [addScore, incrementFlingRight]);

  const handleFlingLeft = useCallback(() => {
    addScore(Math.floor(Math.random() * 10) + 1);
    activateFlingLeft();
  }, [addScore, activateFlingLeft]);

  const handlePinch = useCallback(() => {
    addScore(3);
    activatePinch();
  }, [addScore, activatePinch]);

  // --- Gesture definitions ---

  // Single tap fires immediately — no Exclusive, no waiting
  const tap = Gesture.Tap()
    .maxDuration(200)
    .onStart(() => {
      cancelAnimation(tapScale);
      tapScale.value = withSequence(
        withTiming(0.88, { duration: 60 }),
        withSpring(1, { damping: 6, stiffness: 300 }),
      );
      scheduleOnRN(handleTap);
    });

  // Double tap — runs simultaneously with single tap, both fire on double tap
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(200)
    .onStart(() => {
      cancelAnimation(tapScale);
      tapScale.value = withSequence(
        withTiming(1.18, { duration: 60 }),
        withSpring(1, { damping: 6, stiffness: 300 }),
      );
      scheduleOnRN(handleDoubleTap);
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      rotation.value = withSequence(
        withSpring(15),
        withSpring(-15),
        withSpring(0),
      );
      scheduleOnRN(handleLongPress);
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      scheduleOnRN(handlePanActive);
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      translateX.value = withSequence(
        withTiming(40, { duration: 80 }),
        withSpring(0),
      );
      scheduleOnRN(handleFlingRight);
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      translateX.value = withSequence(
        withTiming(-40, { duration: 80 }),
        withSpring(0),
      );
      scheduleOnRN(handleFlingLeft);
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      pinchScale.value = Math.min(Math.max(e.scale, 0.5), 2.5);
    })
    .onEnd(() => {
      pinchScale.value = withSpring(1);
      scheduleOnRN(handlePinch);
    });

  // Composition:
  // - doubleTap and tap run Simultaneously so single tap fires immediately
  // - pan and pinch are Simultaneous (multi-touch drag + scale)
  // - flings and longPress Race against the tap group
  const taps = Gesture.Simultaneous(doubleTap, tap);

  const composedGesture = Gesture.Simultaneous(
    Gesture.Race(taps, longPress, flingRight, flingLeft),
    pan,
    pinch,
  );

  return {
    gesture: composedGesture,
    animatedValues: {
      tapScale,
      pinchScale,
      translateX,
      translateY,
      rotation,
    },
  };
}
