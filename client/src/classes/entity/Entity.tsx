export interface EntityAttributes {
  id: number;
  isCharacter: boolean;
  rarity: string;
  name: string;
  age: number;
  curiosity: number;
  sociable: number;
  brave: number;
  level: number;
  health: number;
  attack: number;
  attackSpeed: number;
  movementSpeed: number;
  colors: string[];
}

export class Entity {
  attributes: EntityAttributes;
  x: number;
  y: number;

  constructor(
    attributes: EntityAttributes,
    terrainWidth: number,
    terrainHeight: number
  ) {
    this.attributes = attributes;
    // Posición inicial aleatoria dentro del terreno
    this.x = Math.random() * terrainWidth;
    this.y = Math.random() * terrainHeight;
  }
}
