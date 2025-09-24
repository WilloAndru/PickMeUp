import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type HealthState = Record<number, number>;
type LiveState = Record<number, boolean>;

type EntitiesContextType = {
  health: HealthState;
  setHealth: React.Dispatch<React.SetStateAction<HealthState>>;
  isLive: LiveState;
  setIsLive: React.Dispatch<React.SetStateAction<LiveState>>;
};

const EntitiesContext = createContext<EntitiesContextType | undefined>(
  undefined
);

export function EntitiesProvider({ children }: { children: ReactNode }) {
  const [health, setHealth] = useState<HealthState>({});
  const [isLive, setIsLive] = useState<LiveState>({});

  return (
    <EntitiesContext.Provider value={{ health, setHealth, isLive, setIsLive }}>
      {children}
    </EntitiesContext.Provider>
  );
}

export function useEntities() {
  const ctx = useContext(EntitiesContext);
  if (!ctx) throw new Error("useEntities must be inside EntitiesProvider");
  return ctx;
}
