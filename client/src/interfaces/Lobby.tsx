import { useContext, useEffect } from "react";
import { LobbyContext } from "../context/LobbyContext";

function Lobby() {
  const context = useContext(LobbyContext);
  const { listCells, setListCells } = context as any;
  const cellSize = 16;
  const cellsQuantity = 100;

  // Llenamos la lista de celdas
  useEffect(() => {
    setListCells(() => {
      const grid: { [key: string]: number } = {};
      for (let i = 0; i < cellsQuantity; i++) {
        for (let j = 0; j < cellsQuantity; j++) {
          const cellId = `${i}${j}`;
          grid[cellId] = 1;
        }
      }
      return grid;
    });
  }, []);

  useEffect(() => {
    console.log(listCells);
  }, [listCells]);

  return (
    <div className="bg-blue-300 w-screen h-screen">
      <div className=""></div>y
    </div>
  );
}

export default Lobby;
