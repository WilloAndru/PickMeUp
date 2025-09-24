import { useState, useEffect } from "react";
import { CanvasEntity } from "./CanvasEntity";
import { movement } from "./logic/movement";
import Thinking from "../../components/Thinking";
import InformationEntity from "../../components/InformationEntity";
import { eyesPerception } from "./logic/eyesPerception";
import { takeDecision } from "./logic/takeDecision";
import { useEntities } from "../../context/Context";

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
  const [showInformation, setShowInformation] = useState(false);
  const { health, setHealth, isLive, setIsLive } = useEntities();

  // Configuramos el intervalo para mover la entidad automáticamente
  useEffect(() => {
    if (isPause) return;

    const interval = setInterval(() => {
      // Hallamos la lista de enemigos y characters detectados
      const detectedObjects = eyesPerception(
        { x: position.x / 27, y: position.y / 27 },
        coordinates.filter(
          (item: any) => item.type === "Enemy" || item.type === "Character"
        )
      );

      // Si detecta algo
      if (detectedObjects.length > 0) {
        const decision = takeDecision(
          detectedObjects,
          character,
          setFeeling,
          position
        );
        console.log(character.name, decision);

        // Si decide acercarse o huir
        if (decision.action === "move") {
          movement(
            position,
            setPosition,
            coordinates,
            setCoordinates,
            coordinatesAlreadyTaken,
            setCoordinatesAlreadyTaken,
            decision.directions
          );
        }
        // Si esta al lado de la entidad a atacar
        else if (decision.action === "attack") {
          console.log("atacando");
        }
        // Condicional exclusivo cuando los enemigos detectan otros enemigos
        else {
          const directions = ["up", "down", "left", "right"].sort(
            () => Math.random() - 0.5
          ); // Direcciones aleatorias
          movement(
            position,
            setPosition,
            coordinates,
            setCoordinates,
            coordinatesAlreadyTaken,
            setCoordinatesAlreadyTaken,
            directions
          );
        }
      }
      // Si no detecta nada entonces esta libre de explorar
      else {
        setFeeling(""); // Resetemaos las emociones
        const isCurious = Math.random() < character.curiosity / 10;
        if (isCurious) {
          const directions = ["up", "down", "left", "right"].sort(
            () => Math.random() - 0.5
          ); // Direcciones aleatorias
          movement(
            position,
            setPosition,
            coordinates,
            setCoordinates,
            coordinatesAlreadyTaken,
            setCoordinatesAlreadyTaken,
            directions
          );
        }
      }
    }, ratioMovement);

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
        <InformationEntity
          character={character}
          currentHealth={health[character.id]}
        />
      )}
      {feeling && <Thinking feeling={feeling} />}
      <CanvasEntity character={character} />
    </div>
  );
}

export default Entity;
