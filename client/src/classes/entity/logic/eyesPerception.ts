export const eyesPerception = (position: any, coordinates: any) => {
  const distancePerception = 8;

  const nearbyEntities = coordinates.filter((obj: any) => {
    const distance =
      Math.abs(obj.x - position.x) + Math.abs(obj.y - position.y);

    return distance <= distancePerception;
  });

  return nearbyEntities;
};
