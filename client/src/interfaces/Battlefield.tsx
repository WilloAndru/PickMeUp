import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Entity from "../classes/entity/Entity";
import Obstacle from "../classes/obstacle/Obstacle";
import { generateObjects } from "../utils/generateObjects";
import { useZoom } from "../hooks/useZoom";
import { useState, useEffect } from "react";
import { usePan } from "../hooks/usePan";
import PauseMenu from "../components/PauseMenu";
import { IoMenu } from "react-icons/io5";

function Battlefield() {
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const [isPause, setIsPause] = useState(false);

  const cellSize = 27;
  const widthTerrain = 25 * cellSize;

  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<any[]>([]);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [enemies, setEnemies] = useState<any[]>([]);

  // Funcion que se ejecutauna sola vez al inico del nivel
  useEffect(() => {
    // Extraemos los datos de los characters seleccionados
    const chars = JSON.parse(localStorage.getItem("characters") || "[]");
    const selectedIds = JSON.parse(
      localStorage.getItem("selectedCharactersId") || "[]"
    );
    const selectedChars = selectedIds.map((i: number) => chars[i]);

    // Creamos la lista de characters con la posicion incluida
    const cols = Math.ceil(Math.sqrt(selectedChars.length));
    const charactersWithPosition = selectedChars.map(
      (char: any, index: number) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        return {
          ...char,
          x: 1 + col,
          y: 1 + row,
        };
      }
    );
    setSelectedCharacters(charactersWithPosition);

    // Creamos la lista de enemigos y obstaculos
    const { obstacles, enemies } = generateObjects(
      Number(level),
      widthTerrain / cellSize,
      50,
      50
    );
    setObstacles(obstacles);
    setEnemies(enemies);
    console.log(charactersWithPosition, enemies);

    // Establecemos las coordenadas iniciales
    setCoordinates([
      ...charactersWithPosition.map((item: any) => ({
        type: "Character",
        x: item.x,
        y: item.y,
      })),
      ...enemies.map((item) => ({ type: "Enemy", x: item.x, y: item.y })),
      ...obstacles.map((item) => ({ type: "Obstacle", x: item.x, y: item.y })),
    ]);
  }, [level]);

  const { zoom, containerRef } = useZoom();
  const pan = usePan(zoom, widthTerrain);

  return (
    <main className="bg-cyan-400 w-screen h-screen flex items-center justify-center overflow-hidden relative">
      <button
        onClick={() => setIsPause(true)}
        className="link absolute top-4 right-4 z-10"
      >
        <IoMenu />
      </button>

      {isPause && <PauseMenu setIsPause={setIsPause} />}

      <section
        ref={containerRef}
        className="bg-lime-500 relative origin-center"
        style={{
          width: widthTerrain,
          height: widthTerrain,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {selectedCharacters.map((item: any, index: number) => {
          return (
            <Entity
              key={item.id}
              character={item}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              initialX={item.x * cellSize}
              initialY={item.y * cellSize}
              isPause={isPause}
            />
          );
        })}

        {obstacles.map((item: any, index: number) => (
          <Obstacle
            key={index}
            image={item.image}
            x={item.x * cellSize}
            y={item.y * cellSize + cellSize}
            size={cellSize}
          />
        ))}

        {enemies.map((item: any, index: number) => (
          <Entity
            key={item.id - index}
            character={item}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            initialX={item.x * cellSize}
            initialY={item.y * cellSize}
            isPause={isPause}
          />
        ))}
      </section>
    </main>
  );
}

export default Battlefield;
