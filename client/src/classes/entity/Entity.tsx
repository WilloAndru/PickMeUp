import { useState, useEffect } from "react";
import { CanvasEntity } from "./CanvasEntity";

type EntityProps = {
  character: any;
  initialX: number;
  initialY: number;
  isPause: boolean;
  restrictedCoordinates: any;
};

function Entity({
  character,
  initialX,
  initialY,
  isPause,
  restrictedCoordinates,
}: EntityProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  // Función para generar movimiento aleatorio
  const moveRandomly = () => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      const directions = ["up", "down", "left", "right"];
      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      const step = 27;

      switch (direction) {
        case "up":
          newY -= step;
          break;
        case "down":
          newY += step;
          break;
        case "left":
          newX -= step;
          break;
        case "right":
          newX += step;
          break;
      }

      // Limitar movimiento dentro del mapa
      newX = Math.max(0, Math.min(newX, 24 * step));
      newY = Math.max(0, Math.min(newY, 24 * step));

      // Verificar si la nueva posición está restringida
      const isRestricted = restrictedCoordinates.some(
        (coord: any) => coord.x === newX / step && coord.y === newY / step
      );

      if (isRestricted) {
        // No mover si está en coordenada restringida
        return prev;
      }

      return { x: newX, y: newY };
    });
  };

  // Configuramos el intervalo para mover la entidad automáticamente
  useEffect(() => {
    if (isPause) return; //si está pausado, no hacemos nada

    const interval = setInterval(moveRandomly, 500 / character.curiosity);

    return () => clearInterval(interval);
  }, [isPause]);

  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: `transform 0.5s linear`,
      }}
    >
      <CanvasEntity character={character} />
    </div>
  );
}

export default Entity;
