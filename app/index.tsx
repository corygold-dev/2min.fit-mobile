import { CounterProvider } from "@/providers/CounterProvider";
import { ExerciseProvider } from "@/providers/ExerciseProvider";
import { StyleSheet, Text, View } from "react-native";
import Counter from "./components/Counter";
import { ProgramProvider } from "@/providers/ProgramProvider";

export default function Index() {
  return (
    <ExerciseProvider>
      <CounterProvider>
        <ProgramProvider>
          <View style={styles.mainView}>
            <Text>Edit app/index.tsx to edit this screen.</Text>
            <Counter />
          </View>
        </ProgramProvider>
      </CounterProvider>
    </ExerciseProvider>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
