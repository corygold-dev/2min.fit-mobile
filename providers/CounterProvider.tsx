import React, { createContext, FC, ReactNode, useState } from "react";

export interface CounterContextType {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  timerStarted: boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

interface CounterProviderProps {
  children: ReactNode;
}

const CounterProvider: FC<CounterProviderProps> = ({ children }) => {
  const [counter, setCounter] = useState<number>(30);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  return (
    <CounterContext.Provider
      value={{ counter, setCounter, timerStarted, setTimerStarted }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export { CounterProvider, CounterContext };
