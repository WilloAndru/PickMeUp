import {
  useState,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type LobbyContextType = {
  listCells: Record<string, any>;
  setListCells: Dispatch<SetStateAction<Record<string, any>>>;
};

export const LobbyContext = createContext<LobbyContextType | undefined>(
  undefined
);

type LobbyProviderProps = {
  children: ReactNode;
};

export function LobbyProvider({ children }: LobbyProviderProps) {
  const [listCells, setListCells] = useState<Record<string, any>>({});
  return (
    <LobbyContext.Provider value={{ listCells, setListCells }}>
      {children}
    </LobbyContext.Provider>
  );
}
