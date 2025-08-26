import React, { createContext, FC, ReactNode, useState } from "react";

export interface ExerciseContextType {
  exerciseNum: number;
  setExerciseNum: React.Dispatch<React.SetStateAction<number>>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

interface ExerciseProviderProps {
  children: ReactNode;
}

const ExerciseProvider: FC<ExerciseProviderProps> = ({ children }) => {
  const [exerciseNum, setExerciseNum] = useState<number>(1);

  return (
    <ExerciseContext.Provider value={{ exerciseNum, setExerciseNum }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseProvider };
