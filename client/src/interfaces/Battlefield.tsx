import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Entity from "../classes/entity/Entity";
import Obstacle from "../classes/obstacle/Obstacle";
import { generateObstacles } from "../utils/generateObstacles";

function Battlefield() {
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const cellSize = 27;
  const widthTerrain = (20 + Number(level) * 5) * cellSize;

  const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  const selectedCharactersId = JSON.parse(
    localStorage.getItem("selectedCharactersId") || "[]"
  );
  const selectedCharacters = selectedCharactersId.map(
    (i: number) => characters[i]
  );

  const obstacles = generateObstacles(
    widthTerrain / cellSize,
    widthTerrain / 25,
    widthTerrain / 25
  );

  return (
    <main className="bg-cyan-400 w-screen h-screen flex items-center justify-center">
      <section
        className="bg-lime-500 relative"
        style={{
          width: widthTerrain,
          height: widthTerrain,
        }}
      >
        {selectedCharacters.map((item: any, index: number) => (
          <Entity
            key={index}
            character={item}
            x={widthTerrain / 4}
            y={widthTerrain / 2}
          />
        ))}
        {obstacles.map((item: any, index: number) => (
          <Obstacle
            key={index}
            image={item.image}
            x={item.x * cellSize}
            y={item.y * cellSize + cellSize}
            size={cellSize}
          />
        ))}
      </section>
    </main>
  );
}

export default Battlefield;
