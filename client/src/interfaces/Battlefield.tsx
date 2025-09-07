import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Entity from "../classes/entity/Entity";
import Obstacle from "../classes/obstacle/Obstacle";
import { generateObjects } from "../utils/generateObjects";

function Battlefield() {
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const cellSize = 27;
  const widthTerrain = 25 * cellSize;

  const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  const selectedCharactersId = JSON.parse(
    localStorage.getItem("selectedCharactersId") || "[]"
  );
  const selectedCharacters = selectedCharactersId.map(
    (i: number) => characters[i]
  );

  const { obstacles, enemies } = generateObjects(
    Number(level),
    widthTerrain / cellSize,
    25,
    25
  );

  return (
    <main className="bg-cyan-400 w-screen h-screen flex items-center justify-center overflow-hidden">
      <section
        className="bg-lime-500 relative"
        style={{
          width: widthTerrain,
          height: widthTerrain,
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
