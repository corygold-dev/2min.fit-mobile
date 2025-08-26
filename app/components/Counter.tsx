/* eslint-disable react-hooks/exhaustive-deps */
import { Audio } from "expo-av";
import { JSX, useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import type { CounterContextType } from "../../providers/CounterProvider";
import { CounterContext } from "../../providers/CounterProvider";
import type { ExerciseContextType } from "../../providers/ExerciseProvider";
import { ExerciseContext } from "../../providers/ExerciseProvider";
import type { ProgramContextType } from "../../providers/ProgramProvider";
import { ProgramContext } from "../../providers/ProgramProvider";
import { Button, Text } from "react-native-paper";

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
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerStarted && counter > 0) {
      intervalId = setInterval(() => setCounter((prev) => prev - 1), 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerStarted, counter]);

  const handleOpenLink = async () => {
    await WebBrowser.openBrowserAsync(exerciseLink);
  };

  return (
    <View>
      <Text style={styles.counter}>{counter}</Text>
      <View style={styles.videoStartButtons}>
        <Button
          mode="elevated"
          onPress={handleOpenLink}
          style={styles.videoButton}
        >
          <Ionicons name="logo-youtube" size={24} color="red" />
        </Button>
        <Button
          mode="elevated"
          onPress={handleButtonClick}
          style={styles.timerButton}
          disabled={buttonContent === "Get Ready!"}
        >
          {buttonContent}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoStartButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  counter: {
    fontSize: 80,
    marginBottom: 16,
    textAlign: "center",
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
