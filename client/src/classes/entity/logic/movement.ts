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
  const step = 27;
  let isForcedMovement = false;
  let directions = ["up", "down", "left", "right"];

  // Hallamos la lista de enemigos y characters detectados
  const detectedObjects = eyesPerception(
    { x: position.x / 27, y: position.y / 27 },
    coordinates.filter(
      (item: any) => item.type === "Enemy" || item.type === "Character"
    )
  );

  // Hallamos la direccion logica para ir o alejarse de la entidad detectada
  const getDirectionsToMove = (
    isApproach: boolean,
    posx: number,
    posy: number
  ) => {
    const dirs: string[] = [];

    const dx = posx - position.x / step;
    const dy = posy - position.y / step;

    // Priorizamos el eje con la diferencia mayor
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx > 0) dirs.push("right");
      else if (dx < 0) dirs.push("left");

      if (dy > 0) dirs.push("down");
      else if (dy < 0) dirs.push("up");
    } else {
      if (dy > 0) dirs.push("down");
      else if (dy < 0) dirs.push("up");

      if (dx > 0) dirs.push("right");
      else if (dx < 0) dirs.push("left");
    }

    // Rellenar con las restantes para mantener las cuatro direcciones
    const all = ["up", "down", "left", "right"];
    const ordered = dirs.concat(all.filter((d) => !dirs.includes(d)));

    // Devolvemos la lista dependiendo de si quiere acercarce o alejarse
    return isApproach ? ordered : ordered.slice().reverse();
  };

  // Desicion de atacar o no
  const willAttack = (entities: any) => {
    // Probabilidad de que decida atacar segun valentia
    const isAttack = Math.random() < character.brave / 10;
    isForcedMovement = true;
    // Si decide atacar
    if (isAttack) {
      setFeeling("Angry");
      directions = getDirectionsToMove(true, entities.x, entities.y);
    }
    // Si decide huir
    else {
      setFeeling("Fear");
      directions = getDirectionsToMove(false, entities.x, entities.y);
    }
  };

  // Desicion de unirse o no
  const willJoin = (entities: any) => {};

  // Decimos que hacer si se detectan entidades cerca
  if (detectedObjects.length > 0) {
    // Si detecta personajes cerca
    const charactersNear = detectedObjects.filter(
      (item: any) => item.type === "Character"
    );
    if (charactersNear.length > 0) {
      if (character.isCharacter) {
        willJoin(charactersNear[0]);
      } else {
        willAttack(charactersNear[0]);
      }
    }

    // Si detecta enemigos cerca
    const enemiesNear = detectedObjects.filter(
      (item: any) => item.type === "Enemy"
    );
    if (enemiesNear.length > 0) {
      if (character.isCharacter) {
        willAttack(enemiesNear[0]);
      } else {
        willJoin(enemiesNear[0]);
      }
    }
  } else {
    setFeeling("");
  }

  // Funcion de movimiento en una casilla
  const move = () => {
    // Obtenemos una casilla valida
    function getValidPosition(): { x: number; y: number } | undefined {
      // Escojemos una direccion al azar
      if (!isForcedMovement) {
        directions = (() => {
          for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
          }
          return directions;
        })();
      } else {
      }

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
  move();
};
