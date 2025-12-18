"use client";
import { createContext, useContext, useState } from "react";

const IntroContext = createContext(null);

export function IntroProvider({ children }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <IntroContext.Provider value={{ introDone, setIntroDone }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
