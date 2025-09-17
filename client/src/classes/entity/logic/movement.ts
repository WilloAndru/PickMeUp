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

  // Funcion de movimiento en una casilla
  const move = () => {
    const step = 27;

    let newX = position.x;
    let newY = position.y;

    const getValidDirection = () => {
      let index = 0;

      // Ordenamos las direcciones de forma aleatoria
      let directions = (() => {
        const arr = ["up", "down", "left", "right"];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      })();

      switch (directions[index]) {
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
      const cellOccupiedByObstacle = coordinates.find(
        (item: any) => item.x === newX / step && item.y === newY / step
      );

      // Verificamos que la nueva posicion no sea una ya ocupada
      const cellAlreadyTaken = coordinatesAlreadyTaken.find(
        (item: any) => item.x === newX / step && item.y === newY / step
      );

      if (!cellOccupiedByObstacle && !cellAlreadyTaken) {
        return directions[index];
      }
    };

    // Si la nueva posicion no esta bloqueda
    // if (!cellOccupiedByObstacle && !cellAlreadyTaken) {
    //   // Actualizar posición
    //   setPosition({ x: newX, y: newY });

    //   // Actualizar coordenadas ya tomadas
    //   setCoordinatesAlreadyTaken((prev: any[]) => {
    //     const updated = [...prev, { x: newX / step, y: newY / step }];
    //     if (updated.length > 32) updated.shift();
    //     return updated;
    //   });

    //   // Actualizar coordinates
    //   setCoordinates((prev: any) =>
    //     prev.map((item: any) =>
    //       item.x === position.x / step && item.y === position.y / step
    //         ? { ...item, x: newX / step, y: newY / step }
    //         : item
    //     )
    //   );
    // } else {
    //   return;
    // }
  };
  move();
};
