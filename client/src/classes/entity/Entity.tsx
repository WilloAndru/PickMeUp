import { useState, useEffect } from "react";
import { CanvasEntity } from "./CanvasEntity";
import { movement } from "./logic/movement";
import Thinking from "../../components/Thinking";
import InformationEntity from "../../components/InformationEntity";

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
  const [health, setHealth] = useState(character.health);
  const [showInformation, setShowInformation] = useState(false);

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
        setFeeling,
        setHealth
      );
    }, ratioMovement * 1);

    return () => clearInterval(interval);
  }, [isPause, position]);

  return (
    <div
      className="absolute z-100"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform ${ratioMovement / 1000}s linear`,
      }}
      onClick={() => setShowInformation(!showInformation)}
    >
      {showInformation && (
        <InformationEntity character={character} currentHealth={health} />
      )}
      {feeling && <Thinking feeling={feeling} />}
      <CanvasEntity character={character} />
    </div>
  );
}

export default Entity;
