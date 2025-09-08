import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Entity from "../classes/entity/Entity";
import Obstacle from "../classes/obstacle/Obstacle";
import { generateObjects } from "../utils/generateObjects";
import { useZoom } from "../hooks/useZoom";
import { useState, useEffect } from "react";
import { usePan } from "../hooks/usePan";

function Battlefield() {
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const cellSize = 27;
  const widthTerrain = 25 * cellSize;

  const [selectedCharacters, setSelectedCharacters] = useState<any[]>([]);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [enemies, setEnemies] = useState<any[]>([]);

  useEffect(() => {
    const chars = JSON.parse(localStorage.getItem("characters") || "[]");
    const selectedIds = JSON.parse(
      localStorage.getItem("selectedCharactersId") || "[]"
    );
    setSelectedCharacters(selectedIds.map((i: number) => chars[i]));

    const { obstacles, enemies } = generateObjects(
      Number(level),
      widthTerrain / cellSize,
      25,
      25
    );
    setObstacles(obstacles);
    setEnemies(enemies);
  }, [level]);

  const { zoom, containerRef } = useZoom();
  const pan = usePan(zoom, widthTerrain);

  return (
    <main className="bg-cyan-400 w-screen h-screen flex items-center justify-center overflow-hidden">
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
          const cols = Math.ceil(Math.sqrt(selectedCharacters.length));
          const row = Math.floor(index / cols);
          const col = index % cols;

          return (
            <Entity
              key={index}
              character={item}
              x={(1 + col) * cellSize}
              y={(1 + row) * cellSize}
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
            character={item.character}
            x={item.x * cellSize}
            y={item.y * cellSize + cellSize}
          />
        ))}
      </section>
    </main>
  );
}

export default Battlefield;
