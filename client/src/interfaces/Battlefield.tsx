import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Entity from "../classes/entity/Entity";
import Obstacle from "../classes/obstacle/Obstacle";
import { generateObjects } from "../utils/generateObjects";
import { useZoom } from "../hooks/useZoom";
import { useState, useEffect } from "react";
import { usePan } from "../hooks/usePan";
import PauseMenu from "./PauseMenu";
import { IoMenu } from "react-icons/io5";
import { useEntities } from "../context/Context";
import GameOver from "./GameOver";
import ResultsMenu from "./ResultsMenu";
import { FaRegHandPointer } from "react-icons/fa";

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
  const [isOver, setIsOver] = useState(false);
  const [earnedDiamonds, setEarnedDiamonds] = useState(0);
  const [stateInteraction, setStateInteraction] = useState(false);
  const [wasUseInteraction, setWasUseInteraction] = useState(false);

  const { setHealth } = useEntities();

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
      40,
      40
    );
    setObstacles(obstacles);
    setEnemies(enemies);

    // Establecemos las coordenadas iniciales
    setCoordinates([
      ...charactersWithPosition.map((item: any, index: number) => ({
        id: index,
        type: "Character",
        x: item.x,
        y: item.y,
      })),
      ...enemies.map((item, index) => ({
        id: index + 4,
        type: "Enemy",
        x: item.x,
        y: item.y,
      })),
      ...obstacles.map((item) => ({ type: "Obstacle", x: item.x, y: item.y })),
    ]);

    // Inicializamos las variables del contexto
    setHealth(() => {
      const newState: Record<number, number> = {};
      charactersWithPosition.forEach((item: any, index: number) => {
        newState[index] = item.health;
      });
      enemies.forEach((item: any, index: number) => {
        newState[index + 4] = item.health;
      });
      return newState;
    });
  }, [level]);

  // Funcion que se ejecuta cuando todos los enemigos han sido eliminados
  useEffect(() => {
    if (earnedDiamonds === 1) {
      let diamondsStores = JSON.parse(localStorage.getItem("diamonds") || "20");
      let diamonds = 0;
      let lastClearedLevel = JSON.parse(
        localStorage.getItem("lastClearedLevel") || "[]"
      );
      // Da los diamantes ganados y actualiza el ultimo nivel superado
      if (level === lastClearedLevel) {
        diamonds += Number(level) * 10;
        localStorage.setItem(
          "lastClearedLevel",
          JSON.stringify(lastClearedLevel + 1)
        );
      } else {
        diamonds += Number(level) * 2;
      }
      setEarnedDiamonds(diamonds);
      localStorage.setItem(
        "diamonds",
        JSON.stringify(diamonds + diamondsStores)
      );
    }
  }, [earnedDiamonds]);

  // Funcion para salir del modo interactivo
  useEffect(() => {
    const exitStateInteractive = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stateInteraction) {
        setStateInteraction(false);
      }
    };

    document.addEventListener("keydown", exitStateInteractive);
    return () => document.removeEventListener("keydown", exitStateInteractive);
  }, [stateInteraction]);

  const { zoom, containerRef } = useZoom();
  const pan = usePan(zoom, widthTerrain);
  return (
    <main className="bg-cyan-400 w-screen h-screen flex items-center justify-center overflow-hidden relative">
      <div className="flex gap-3 absolute top-4 right-4 z-10">
        {!wasUseInteraction && (
          <button
            onClick={() => setStateInteraction(!stateInteraction)}
            className="link"
          >
            <FaRegHandPointer />
          </button>
        )}
        <button onClick={() => setIsPause(true)} className="link">
          <IoMenu />
        </button>
      </div>

      {isPause && <PauseMenu setIsPause={setIsPause} />}
      {isOver && <GameOver />}
      {earnedDiamonds >= 1 && (
        <ResultsMenu level={Number(level)} earnedDiamonds={earnedDiamonds} />
      )}
      {stateInteraction && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col gap-2 items-center box">
          <h1 className="text-lg">Interaction Mode</h1>
          <h1 className="text-[12px]">
            Select a character to heal half of their health, or select an enemy
            to remove half of their health.
          </h1>
        </div>
      )}

      <section
        ref={containerRef}
        className="relative origin-center"
        style={{
          width: widthTerrain,
          height: widthTerrain,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: "transform 0.2s ease-out",
          background: stateInteraction ? "#78b815" : "#84cc16",
        }}
      >
        {selectedCharacters.map((item: any, index: number) => {
          return (
            <Entity
              key={index}
              id={index}
              character={item}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              initialX={item.x * cellSize}
              initialY={item.y * cellSize}
              isPause={isPause}
              isOver={isOver}
              setIsOver={setIsOver}
              earnedDiamonds={earnedDiamonds}
              setEarnedDiamonds={setEarnedDiamonds}
              stateInteraction={stateInteraction}
              setStateInteraction={setStateInteraction}
              setWasUseInteraction={setWasUseInteraction}
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
            key={index}
            id={index + 4}
            character={item}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            initialX={item.x * cellSize}
            initialY={item.y * cellSize}
            isPause={isPause}
            isOver={isOver}
            setIsOver={setIsOver}
            earnedDiamonds={earnedDiamonds}
            setEarnedDiamonds={setEarnedDiamonds}
            stateInteraction={stateInteraction}
            setStateInteraction={setStateInteraction}
            setWasUseInteraction={setWasUseInteraction}
          />
        ))}
      </section>
    </main>
  );
}

export default Battlefield;
