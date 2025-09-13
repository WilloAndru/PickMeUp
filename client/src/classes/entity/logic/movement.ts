import { eyesPerception } from "./eyesPerception";

export const movement = (
  position: any,
  setPosition: any,
  coordinates: any,
  setCoordinates: any
) => {
  // Hallamos la lista de enemigos o characters detectados
  const detectedObjects = eyesPerception(
    { x: position.x / 27, y: position.y / 27 },
    coordinates.filter(
      (item: any) => item.type === "Enemy" || item.type === "Character"
    )
  );

  // Funcion de movimiento
  setPosition((prev: any) => {
    let newX = prev.x;
    let newY = prev.y;

    const directions = ["up", "down", "left", "right"];
    const direction = directions[Math.floor(Math.random() * directions.length)];

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
    const isRestricted = coordinates.some(
      (coord: any) => coord.x === newX / step && coord.y === newY / step
    );

    // No mover si está en coordenada restringida
    if (isRestricted) {
      return prev;
    }

    // Actualizamos las coordenadas
    setCoordinates((prev: any) =>
      prev.map((item: any) =>
        item.x === position.x && item.y === position.y
          ? { ...item, x: newX, y: newY }
          : item
      )
    );

    return { x: newX, y: newY };
  });
};
