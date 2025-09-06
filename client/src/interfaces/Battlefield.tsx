import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import { Entity, type EntityAttributes } from "../classes/entity/Entity";

function Battlefield() {
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const cellSize = 27;
  const widthTerrain = 20 + Number(level) * 5;

  const [entities, setEntities] = useState<Entity[]>([]);
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  return (
    <main className="bg-cyan-400 w-screen h-screen">
      <section
        className="bg-lime-500 relative"
        style={{
          width: widthTerrain * cellSize,
          height: widthTerrain * cellSize,
        }}
      >
        {characters.map((item: any, index: number) => (
          <CanvasEntity key={index} character={item} />
        ))}
      </section>
    </main>
  );
}

export default Battlefield;
