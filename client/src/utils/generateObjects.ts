import { dataEnemies, enemiesByLevel } from "../data/dataEnemies";

type Obstacle = { image: string; x: number; y: number };
type Enemy = { x: number; y: number };

function getUniquePosition(
  cells: number,
  usedPositions: Set<string>
): { x: number; y: number } {
  let x: number;
  let y: number;
  let key: string;
  do {
    x = Math.floor(Math.random() * cells);
    y = Math.floor(Math.random() * cells);
    key = `${x},${y}`;
    // Evitar las 9 casillas de la esquina superior izquierda
  } while (usedPositions.has(key) || (x <= 2 && y <= 2));
  usedPositions.add(key);
  return { x, y };
}

export function generateEnemies(
  level: number,
  cells: number,
  usedPositions: Set<string>
): Enemy[] {
  const enemies: Enemy[] = [];
  const enemyConfigs = enemiesByLevel[level - 1];

  if (enemyConfigs) {
    for (const config of enemyConfigs) {
      for (let i = 0; i < config.quantity; i++) {
        const { x, y } = getUniquePosition(cells, usedPositions);
        enemies.push({ ...dataEnemies[config.index], x, y });
      }
    }
  }

  return enemies;
}

export function generateObstacles(
  cells: number,
  trees: number,
  stones: number,
  usedPositions: Set<string>
): Obstacle[] {
  const obstacles: Obstacle[] = [];

  const isFarEnough = (x: number, y: number) => {
    return obstacles.every(
      (o) => Math.abs(o.x - x) > 1 || Math.abs(o.y - y) > 1
    );
  };

  const addObstacle = (image: string) => {
    let pos;
    do {
      pos = getUniquePosition(cells, usedPositions);
    } while (!isFarEnough(pos.x, pos.y)); // Reintenta si no cumple la distancia mínima
    obstacles.push({ image, x: pos.x, y: pos.y });
  };

  for (let i = 0; i < stones; i++) {
    addObstacle("stone.png");
  }

  for (let i = 0; i < trees; i++) {
    addObstacle("tree.png");
  }

  return obstacles;
}

// Genera dos listas separadas
export function generateObjects(
  level: number,
  cells: number,
  trees: number,
  stones: number
): { obstacles: Obstacle[]; enemies: Enemy[] } {
  const usedPositions = new Set<string>();

  const obstacles = generateObstacles(cells, trees, stones, usedPositions);
  const enemies = generateEnemies(level, cells, usedPositions);

  return { obstacles, enemies };
}
