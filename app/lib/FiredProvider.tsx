"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const FiredContext = createContext<
  | { people: string[]; setPeople: Dispatch<SetStateAction<string[]>> }
  | undefined
>(undefined);

export function FiredProvider({ children }) {
  const [people, setPeople] = useState<string[]>([]);
  return (
    <FiredContext.Provider value={{ people, setPeople }}>
      {children}
    </FiredContext.Provider>
  );
}

export const useFiredContext = () => {
  const firedContext = useContext(FiredContext);
  if (firedContext == undefined) {
    throw new Error("Fired Context must be wrapped in provider");
  }
  return firedContext;
};
