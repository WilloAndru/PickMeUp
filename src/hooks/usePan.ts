import { useState, useEffect } from "react";

export function usePan(
  zoom: number,
  widthTerrain: number,
  initialX = 0,
  initialY = 0
) {
  const [offset, setOffset] = useState({ x: initialX, y: initialY });

  // step dinámico: 10% del ancho del terreno multiplicado por zoom
  const step = widthTerrain * 0.1 * zoom;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (zoom <= 1) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    // Desplazamiento máximo permitido según zoom
    const maxOffset = ((zoom - 1) * widthTerrain) / 2; // ejemplo: mitad del terreno extra

    setOffset((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          newY = Math.min(prev.y + step, maxOffset);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newY = Math.max(prev.y - step, -maxOffset);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newX = Math.min(prev.x + step, maxOffset);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newX = Math.max(prev.x - step, -maxOffset);
          break;
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoom]); // se vuelve a ejecutar cuando zoom cambie

  return offset;
}
