export const dataEnemies = [
  {
    id: 1,
    isCharacter: false,
    rarity: 1,
    name: "Goblin",
    age: 10,
    curiosity: 1,
    sociable: 1,
    brave: 1,
    level: 1,
    health: 1,
    attack: 2,
    attackSpeed: 2,
    movementSpeed: 3,
    colors: [
      "#4B8B3B", // piel (verde goblin)
      "#2F5E25", // piel sombra
      "#FFD700", // iris (amarillo dorado)
      "#B8860B", // iris sombra
      "#654321", // ropa (marrón oscuro cuero)
      "#3B2414", // ropa sombra
      "#A9A9A9", // cabello luminoso (grisáceo)
      "#696969", // cabello
      "#2F2F2F", // cabello sombra
    ],
  },
  {
    id: 2,
    isCharacter: false,
    rarity: 1,
    name: "Orc",
    age: 20,
    curiosity: 1,
    sociable: 1,
    brave: 1,
    level: 5,
    health: 6,
    attack: 5,
    attackSpeed: 1,
    movementSpeed: 1,
    colors: [
      "#B22222", // piel (rojo fuego)
      "#7A1C1C", // piel sombra
      "#FFA500", // iris (naranja)
      "#CC8400", // iris sombra
      "#3C2F2F", // ropa (marrón rojizo)
      "#1E1A1A", // ropa sombra
      "#D2B48C", // cabello luminoso
      "#8B5A2B", // cabello (castaño rojizo)
      "#4B2E1A", // cabello sombra
    ],
  },
  {
    id: 3,
    isCharacter: false,
    rarity: 1,
    name: "Demon",
    age: 30,
    curiosity: 1,
    sociable: 1,
    brave: 1,
    level: 10,
    health: 6,
    attack: 5,
    attackSpeed: 5,
    movementSpeed: 2,
    colors: [
      "#FF69B4", // piel
      "#C71585", // piel sombra
      "#32CD32", // iris
      "#006400", // iris sombra
      "#4B0082", // ropa
      "#2B003D", // ropa sombra
      "#9370DB", // cabello luminoso (lavanda/morado claro)
      "#6A0DAD", // cabello (morado oscuro)
      "#3B0066", // cabello sombra (morado muy profundo)
    ],
  },
];

export const enemiesByLevel = [
  [{ quantity: 2, index: 0 }],
  [{ quantity: 4, index: 0 }],
  [{ quantity: 6, index: 0 }],
  [
    { quantity: 2, index: 0 },
    { quantity: 1, index: 1 },
  ],
  [
    { quantity: 4, index: 0 },
    { quantity: 2, index: 1 },
  ],
  [
    { quantity: 6, index: 0 },
    { quantity: 3, index: 1 },
  ],
  [
    { quantity: 2, index: 1 },
    { quantity: 1, index: 2 },
  ],
  [
    { quantity: 4, index: 1 },
    { quantity: 2, index: 2 },
  ],
  [
    { quantity: 6, index: 1 },
    { quantity: 3, index: 2 },
  ],
  [
    { quantity: 10, index: 0 },
    { quantity: 5, index: 1 },
    { quantity: 3, index: 2 },
  ],
];
