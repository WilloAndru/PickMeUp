import { eyesPerception } from "./eyesPerception";

export const movement = (
  position: any,
  setPosition: any,
  coordinates: any,
  setCoordinates: any,
  coordinatesAlreadyTaken: any,
  setCoordinatesAlreadyTaken: any
) => {
  // Hallamos la lista de enemigos o characters detectados
  const detectedObjects = eyesPerception(
    { x: position.x / 27, y: position.y / 27 },
    coordinates.filter(
      (item: any) => item.type === "Enemy" || item.type === "Character"
    )
  );

  // Funcion de movimiento en una casilla
  const move = () => {
    const step = 27;

    const directions = ["up", "down", "left", "right"];

    // Filtrar solo direcciones válidas
    const validDirections = directions.filter((direction) => {
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

      // Revisar si la coordenada ya está tomada
      return !coordinatesAlreadyTaken.some(
        (coord: any) => coord.x === newX && coord.y === newY
      );
    });

    // Si no hay direcciones válidas, no mover
    if (validDirections.length === 0) return;

    // Elegir aleatoriamente entre las válidas
    const direction =
      validDirections[Math.floor(Math.random() * validDirections.length)];

    // Calcular nueva posición
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

    // Limitar dentro del mapa (por si acaso)
    newX = Math.max(0, Math.min(newX, 24 * step));
    newY = Math.max(0, Math.min(newY, 24 * step));

    // Actualizar posición
    setPosition({ x: newX, y: newY });

    // Actualizar coordenadas ya tomadas
    setCoordinatesAlreadyTaken((prev: any[]) => {
      const updated = [...prev, { x: newX, y: newY }];
      if (updated.length > 8) updated.shift();
      return updated;
    });

    // Actualizar coordinates
    setCoordinates((prev: any) =>
      prev.map((item: any) =>
        item.x === position.x && item.y === position.y
          ? { ...item, x: newX, y: newY }
          : item
      )
    );
  };
  move();
};
