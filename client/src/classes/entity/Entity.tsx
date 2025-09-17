import { useState, useEffect } from "react";
import { CanvasEntity } from "./CanvasEntity";
import { movement } from "./logic/movement";
import Thinking from "../../components/Thinking";

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
  const ratioMovement = 500;
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [coordinatesAlreadyTaken, setCoordinatesAlreadyTaken] = useState([]);
  const [feeling, setFeeling] = useState("");

  // Configuramos el intervalo para mover la entidad automáticamente
  useEffect(() => {
    if (isPause) return; // si está pausado, no hacemos nada

    const interval = setInterval(() => {
      movement(
        character,
        position,
        setPosition,
        coordinates,
        setCoordinates,
        coordinatesAlreadyTaken,
        setCoordinatesAlreadyTaken,
        setFeeling
      );
    }, ratioMovement * 1);

    return () => clearInterval(interval);
  }, [isPause, position]);

  return (
    <div
      className="relative"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform ${ratioMovement / 1000}s linear`,
      }}
    >
      {feeling && <Thinking feeling={feeling} />}
      <CanvasEntity character={character} />
    </div>
  );
}

export default Entity;
