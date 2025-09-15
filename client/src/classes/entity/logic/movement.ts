import { eyesPerception } from "./eyesPerception";

export const movement = (
  character: any,
  position: any,
  setPosition: any,
  coordinates: any,
  setCoordinates: any,
  coordinatesAlreadyTaken: any,
  setCoordinatesAlreadyTaken: any,
  setFeeling: any
) => {
  // Hallamos la lista de enemigos y characters detectados
  const detectedObjects = eyesPerception(
    { x: position.x / 27, y: position.y / 27 },
    coordinates.filter(
      (item: any) => item.type === "Enemy" || item.type === "Character"
    )
  );

  // Desicion de atacar o no
  const willAttack = (entities: any) => {
    const isAttack = Math.random() < character.brave / 10;
    isAttack ? setFeeling("Angry") : setFeeling("Fear");
  };

  // Desicion de unirse o no
  const willJoin = (entities: any) => {};

  // Decimos que hacer si se detectan entidades cerca
  if (detectedObjects.length > 0) {
    const charactersNear = detectedObjects.filter(
      (item: any) => item.type === "Character"
    );

    if (charactersNear.length > 0) {
      if (character.isCharacter) {
        willJoin(charactersNear);
      } else {
        willAttack(charactersNear);
      }
    }

    const enemiesNear = detectedObjects.filter(
      (item: any) => item.type === "Enemy"
    );
    if (enemiesNear.length > 0) {
      if (character.isCharacter) {
        willAttack(enemiesNear);
      } else {
        willJoin(enemiesNear);
      }
    }
  } else {
    setFeeling("");
  }

  const move = () => {
    // Funcion de movimiento en una casilla
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

      // Retorna true solo si no está en coordinates ni coordinatesAlreadyTaken
      return (
        !coordinates.some(
          (coord: any) => coord.x === newX / step && coord.y === newY / step
        ) &&
        !coordinatesAlreadyTaken.some(
          (coord: any) => coord.x === newX / step && coord.y === newY / step
        )
      );
    });

    // Si no hay direcciones válidas, no mover
    if (validDirections.length === 0) setCoordinatesAlreadyTaken([]);

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
      const updated = [...prev, { x: newX / step, y: newY / step }];
      if (updated.length > 16) updated.shift();
      return updated;
    });

    // Actualizar coordinates
    setCoordinates((prev: any) =>
      prev.map((item: any) =>
        item.x === position.x / 27 && item.y === position.y / 27
          ? { ...item, x: newX / 27, y: newY / 27 }
          : item
      )
    );
  };
  move();
};
