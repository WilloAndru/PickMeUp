import React from "react";
import { CanvasEntity } from "./CanvasEntity";

type EntityProps = {
  character: any;
  x: number;
  y: number;
};

function Entity({ character, x, y }: EntityProps) {
  return (
    <div className="absolute" style={{ top: `${y}px`, left: `${x}px` }}>
      <CanvasEntity character={character} />
    </div>
  );
}

export default React.memo(Entity);
