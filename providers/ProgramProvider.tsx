import React, { createContext, ReactNode, useState } from "react";
import {
  DayExercises,
  intermediate,
  WorkoutPlan,
} from "../exercises/intermediate";

export interface ProgramContextType {
  program: WorkoutPlan;
  setProgram: React.Dispatch<React.SetStateAction<WorkoutPlan>>;
  exerciseBlock: DayExercises;
  setRandom: React.Dispatch<React.SetStateAction<boolean>>;
  random: boolean;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

interface ProgramProviderProps {
  children: ReactNode;
}

function ProgramProvider({ children }: ProgramProviderProps) {
  const [program, setProgram] = useState<WorkoutPlan>(intermediate);
  const [random, setRandom] = useState<boolean>(false);

  const day = new Date().getDay();
  let exerciseBlock = program[day] as DayExercises;

  if (day === 0 || day === 6 || random) {
    // Choose a random day between 1-5
    const randomDay = Math.floor(Math.random() * 5) + 1;
    exerciseBlock = program[randomDay] as DayExercises;
  }

  return (
    <ProgramContext.Provider
      value={{ program, setProgram, exerciseBlock, setRandom, random }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export { ProgramContext, ProgramProvider };
