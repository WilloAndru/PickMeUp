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

  const step = 27;

  const directions = ["up", "down", "left", "right"];
  const direction = directions[Math.floor(Math.random() * directions.length)];

  let newX = position.x;
  let newY = position.y;

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

  // Limitar dentro del mapa
  newX = Math.max(0, Math.min(newX, 24 * step));
  newY = Math.max(0, Math.min(newY, 24 * step));

  // Verificar coordenadas restringidas
  const isRestricted = coordinates.some(
    (coord: any) => coord.x === newX / step && coord.y === newY / step
  );
  if (isRestricted) return; // no mover nada si está restringido

  // Actualizar posición
  setPosition({ x: newX, y: newY });

  // Actualizar coordinates fuera de setPosition
  setCoordinates((prev: any) => {
    return prev.map((item: any) => {
      const match =
        item.x === position.x / step && item.y === position.y / step;
      return match ? { ...item, x: newX / step, y: newY / step } : item;
    });
  });
};
