import { useState, useEffect } from "react";
import { CanvasEntity } from "./CanvasEntity";
import { movement } from "./logic/movement";

type EntityProps = {
  character: any;
  coordinates: any;
  setCoordinates: any;
  initialX: number;
  initialY: number;
  isPause: boolean;
};

function Entity({
  character,
  coordinates,
  setCoordinates,
  initialX,
  initialY,
  isPause,
}: EntityProps) {
  const ratioMovement = 1000 - (character.curiosity - 1) * 100;
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [coordinatesAlreadyTaken, setCoordinatesAlreadyTaken] = useState([]);

  // Configuramos el intervalo para mover la entidad automáticamente
  useEffect(() => {
    if (isPause) return; // si está pausado, no hacemos nada

    const interval = setInterval(() => {
      movement(
        position,
        setPosition,
        coordinates,
        setCoordinates,
        coordinatesAlreadyTaken,
        setCoordinatesAlreadyTaken
      );
    }, ratioMovement);

    return () => clearInterval(interval);
  }, [isPause, position]);

  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform 0.1s linear`,
      }}
    >
      <CanvasEntity character={character} />
    </div>
  );
}

export default Entity;
