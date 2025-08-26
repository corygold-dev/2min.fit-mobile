/* eslint-disable react-hooks/exhaustive-deps */
import { Audio } from "expo-av";
import { JSX, useContext, useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { StyleSheet } from "react-native";
import type { CounterContextType } from "../../providers/CounterProvider";
import { CounterContext } from "../../providers/CounterProvider";
import type { ExerciseContextType } from "../../providers/ExerciseProvider";
import { ExerciseContext } from "../../providers/ExerciseProvider";
import type { ProgramContextType } from "../../providers/ProgramProvider";
import { ProgramContext } from "../../providers/ProgramProvider";

export default function Counter(): JSX.Element {
  const { timerStarted, setTimerStarted } = useContext(
    CounterContext,
  ) as CounterContextType;
  const { setExerciseNum, exerciseNum } = useContext(
    ExerciseContext,
  ) as ExerciseContextType;
  const { exerciseBlock } = useContext(ProgramContext) as ProgramContextType;

  const exerciseLink: string = exerciseBlock[exerciseNum]["link"];

  const [counter, setCounter] = useState<number>(30);
  const [buttonContent, setButtonContent] = useState<string>("Start");
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/ding.mp3"),
      );
      setSound(sound);
    }

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  async function playDingSound() {
    if (sound) {
      await sound.replayAsync();
    }
  }

  function handleButtonClick(): void {
    switch (buttonContent) {
      case "Start": {
        setButtonContent("Get Ready!");
        setTimeout(() => {
          playDingSound();
          setTimerStarted(true);
          setButtonContent("Stop");
        }, 4500);
        break;
      }
      case "Stop": {
        setTimerStarted(false);
        setButtonContent("Reset");
        break;
      }
      case "Reset": {
        setTimerStarted(false);
        setCounter(exerciseNum === 3 ? 60 : 30);
        setButtonContent("Start");
        break;
      }
      default:
        return;
    }
  }

  useEffect(() => {
    function handleCount(): void {
      if (!timerStarted && buttonContent !== "Reset") {
        setCounter(exerciseNum === 3 ? 60 : 30);
      }
    }
    function handleButtonContent(): void {
      if (counter < 1) {
        playDingSound();
        setTimerStarted(false);
        setButtonContent("Start");
        setExerciseNum(exerciseNum !== 3 ? exerciseNum + 1 : 1);
        setCounter(exerciseNum === 3 ? 60 : 30);
      }
    }
    handleButtonContent();
    handleCount();
    timerStarted &&
      counter > 0 &&
      setTimeout(() => setCounter(counter - 1), 1000);
  });

  return (
    <div>
      <div style={styles.counter}>{counter}</div>
      <div style={styles.videoStartButtons}>
        <a href={exerciseLink} target="_blank" rel="noreferrer">
          <button style={styles.videoButton}>
            <FaYoutube />
          </button>
        </a>
        <button style={styles.timerButton} onClick={handleButtonClick}>
          {buttonContent}
        </button>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  videoStartButtons: {
    display: "flex",
  },
  counter: {
    fontSize: 80,
    marginBottom: 16,
  },
  timerButton: {
    width: 175,
    padding: 0,
  },
  videoButton: {
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
});
