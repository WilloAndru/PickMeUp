type Obstacle = {
  image: string;
  x: number;
  y: number;
};

export function generateObstacles(
  cells: number,
  trees: number,
  stones: number
): Obstacle[] {
  const obstacles: Obstacle[] = [];
  const usedPositions = new Set<string>();

  function getUniquePosition(): { x: number; y: number } {
    let x: number;
    let y: number;
    let key: string;
    do {
      x = Math.floor(Math.random() * cells);
      y = Math.floor(Math.random() * cells);
      key = `${x},${y}`;
    } while (usedPositions.has(key));
    usedPositions.add(key);
    return { x, y };
  }

  // Generar árboles
  for (let i = 0; i < trees; i++) {
    const { x, y } = getUniquePosition();
    obstacles.push({ image: "tree.png", x, y });
  }

  // Generar piedras
  for (let i = 0; i < stones; i++) {
    const { x, y } = getUniquePosition();
    obstacles.push({ image: "stone.png", x, y });
  }

  return obstacles;
}
