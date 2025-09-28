type Decision = { action: string; directions: string[] };

export const takeDecision = (
  detectedObject: any,
  character: any,
  setFeeling: any,
  position: any
): Decision => {
  const firstEntitiDetected = detectedObject[0]; // Trabajamos con la primera entidad detectada

  // Verificamos que esta al lado de la unidad percibida
  const isNearToTargetEntiti = (() => {
    const dx = firstEntitiDetected.x - position.x / 27;
    const dy = firstEntitiDetected.y - position.y / 27;

    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  })();

  // Forzamos la direccion logica para acercarse o alejarse de la entidad detectada
  const getDirectionsToMove = (isApproach: boolean) => {
    const dirs: string[] = [];

    const dx = firstEntitiDetected.x - position.x / 27;
    const dy = firstEntitiDetected.y - position.y / 27;

    // Hallamos el orden de direcciones con prioridad
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
  const willAttack = () => {
    // Probabilidad de que decida atacar segun valentia
    const isAttack = Math.random() < character.brave / 10;
    // Si decide atacar
    if (isAttack) {
      setFeeling("Angry");
      // Si esta al lado de la unidad entonces no se movera y atacara
      if (isNearToTargetEntiti) {
        return { action: "attack", directions: [] };
      }
      // Si esta lejos de la unidad entonces dara una direccion para acercarse
      else {
        return { action: "move", directions: getDirectionsToMove(true) };
      }
    }
    // Si decide huir
    else {
      setFeeling("Fear");
      return { action: "move", directions: getDirectionsToMove(false) };
    }
  };

  // Desicion de socializar o no
  const willJoin = () => {
    // Probabilidad de que decida socializar segun sociabilidad
    const isSocialice = Math.random() < character.sociable / 10;
    // Si decide socializar
    if (isSocialice) {
      setFeeling("Happy");
      return { action: "move", directions: getDirectionsToMove(true) };
    } else {
      return { action: "none", directions: [] };
    }
  };

  // Decimos que hacer si se detectan entidades cerca
  const isCharacterNear = firstEntitiDetected.type === "Character";
  // Detecto una entidad de tipo character
  if (isCharacterNear) {
    return character.isCharacter ? willJoin() : willAttack();
  }
  // Detecto una entidad de tipo enemy
  else {
    return character.isCharacter && willAttack();
  }
};
