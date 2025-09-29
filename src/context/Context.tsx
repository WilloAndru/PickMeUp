import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type HealthState = Record<number, number>;

type EntitiesContextType = {
  health: HealthState;
  setHealth: React.Dispatch<React.SetStateAction<HealthState>>;
};

const EntitiesContext = createContext<EntitiesContextType | undefined>(
  undefined
);

export function EntitiesProvider({ children }: { children: ReactNode }) {
  const [health, setHealth] = useState<HealthState>({});

  return (
    <EntitiesContext.Provider value={{ health, setHealth }}>
      {children}
    </EntitiesContext.Provider>
  );
}

export function useEntities() {
  const ctx = useContext(EntitiesContext);
  if (!ctx) throw new Error("useEntities must be inside EntitiesProvider");
  return ctx;
}
