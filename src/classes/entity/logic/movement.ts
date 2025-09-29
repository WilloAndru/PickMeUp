export const movement = (
  position: any,
  setPosition: any,
  coordinates: any,
  setCoordinates: any,
  coordinatesAlreadyTaken: any,
  setCoordinatesAlreadyTaken: any,
  directions: string[]
) => {
  const step = 27;

  // Obtenemos una casilla valida
  function getValidPosition(): { x: number; y: number } | undefined {
    let i = 0;

    while (i < directions.length) {
      let newX = position.x;
      let newY = position.y;

      switch (directions[i]) {
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

      // Limitamos la nueva posicion dentro del mapa
      newX = Math.max(0, Math.min(newX, 24 * step));
      newY = Math.max(0, Math.min(newY, 24 * step));

      // Verificamos que la nueva posicion no este tomada por un obstaculo o enemigo
      const cellOccupiedByObstacle = coordinates.some(
        (item: any) => item.x === newX / step && item.y === newY / step
      );

      // Verificamos que la nueva posicion no halla sido tomada previamente
      const cellAlreadyTaken = coordinatesAlreadyTaken.some(
        (item: any) => item.x === newX / step && item.y === newY / step
      );

      // Devolvemos la posicion si esta diponible
      if (!cellOccupiedByObstacle && !cellAlreadyTaken) {
        return { x: newX, y: newY };
      }
      i++;
    }

    // Si no hay casillas diponibles retornamos a la casilla anterior
    return {
      x: coordinatesAlreadyTaken.at(-2).x * step,
      y: coordinatesAlreadyTaken.at(-2).y * step,
    };
  }

  const newPosition = getValidPosition();
  if (!newPosition) return;

  // Actualizamos posición
  setPosition(newPosition);

  // Actualizar coordenadas ya tomadas
  setCoordinatesAlreadyTaken((prev: any[]) => {
    const updated = [
      ...prev,
      { x: newPosition.x / step, y: newPosition.y / step },
    ];
    if (updated.length > 16) updated.shift();
    return updated;
  });

  // Actualizar coordinadas
  setCoordinates((prev: any) =>
    prev.map((item: any) =>
      item.x === position.x / step && item.y === position.y / step
        ? { ...item, x: newPosition.x / step, y: newPosition.y / step }
        : item
    )
  );
};
