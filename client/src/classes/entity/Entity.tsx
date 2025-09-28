import { useState, useEffect } from "react";
import { CanvasEntity } from "./CanvasEntity";
import { movement } from "./logic/movement";
import Thinking from "../../components/Thinking";
import InformationEntity from "../../components/InformationEntity";
import { eyesPerception } from "./logic/eyesPerception";
import { takeDecision } from "./logic/takeDecision";
import { useEntities } from "../../context/Context";

type EntityProps = {
  id: number;
  character: any;
  coordinates: any;
  setCoordinates: any;
  initialX: number;
  initialY: number;
  isPause: boolean;
  setIsOver: any;
  setEarnedDiamonds: any;
};

function Entity({
  id,
  character,
  coordinates,
  setCoordinates,
  initialX,
  initialY,
  isPause,
  setIsOver,
  setEarnedDiamonds,
}: EntityProps) {
  const ratioMovement = 500;
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [coordinatesAlreadyTaken, setCoordinatesAlreadyTaken] = useState([]);
  const [feeling, setFeeling] = useState("");
  const [showInformation, setShowInformation] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const { health, setHealth } = useEntities();

  // Configuramos el intervalo para mover la entidad automáticamente
  useEffect(() => {
    if (isPause) return;
    if (!isLive) return;

    const interval = setInterval(() => {
      // Hallamos la lista de enemigos y characters detectados
      const detectedObject = eyesPerception(
        { x: position.x / 27, y: position.y / 27 },
        coordinates.filter(
          (item: any) =>
            (item.type === "Enemy" || item.type === "Character") &&
            item.id !== id
        )
      );

      // Si detecta algo
      if (detectedObject.length > 0) {
        // La entidad calcula una decision
        const decision = takeDecision(
          detectedObject,
          character,
          setFeeling,
          position
        );
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
        // Si decide atacar a la unidad cercana
        else if (decision.action === "attack") {
          const damage = character.attack * 0.1;
          const newHealth = Number(
            (health[detectedObject[0].id] - damage).toFixed(2)
          );
          setHealth((prev) => ({
            ...prev,
            [detectedObject[0].id]: newHealth,
          }));
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
  }, [isPause, position, health]);

  // Verificamos si la entidad murio
  useEffect(() => {
    console.log(character.name, health[id]);
    if (health[id] <= 0) {
      setIsLive(false);
      // Si muere un character lo eliminamos de la localStorage
      if (character.isCharacter) {
        const chars = JSON.parse(localStorage.getItem("characters") || "[]");
        const updated = chars.filter((c: any) => c.id !== character.id);
        localStorage.setItem("characters", JSON.stringify(updated));
        // Si muere el ultimo personaje, activamos isOver
        if (chars.length === 1) setIsOver(true);
        // Si todos los enemigos estan muertos entonces activamos interfaz de victoria
        else {
          const isAllEnemiesDead = Object.entries(health)
            .filter(([key]) => Number(key) >= 4)
            .every(([_, value]) => value === 0);
          if (isAllEnemiesDead) setEarnedDiamonds(1);
          console.log("Son todos los enemigos muertos", isAllEnemiesDead);
        }
      }
      setCoordinates((prev: any[]) => prev.filter((item) => item.id !== id));
    }
  }, [health[id]]);

  return (
    <div
      className="absolute z-100"
      style={{
        display: isLive ? "flex" : "none",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform ${ratioMovement / 1000}s linear`,
      }}
      onClick={() => setShowInformation(!showInformation)}
    >
      {showInformation && (
        <InformationEntity character={character} currentHealth={health[id]} />
      )}
      {feeling && <Thinking feeling={feeling} />}
      <CanvasEntity character={character} />
    </div>
  );
}

export default Entity;
