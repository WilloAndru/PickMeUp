export const eyesPerception = (position: any, coordinates: any) => {
  const distancePerception = 8;

  const nearbyEntities = coordinates.filter((obj: any) => {
    // Ignorar la propia posición
    if (obj.x === position.x && obj.y === position.y) return false;

    const distance =
      Math.abs(obj.x - position.x) + Math.abs(obj.y - position.y);

    return distance <= distancePerception;
    console.log(nearbyEntities);
  });
};
