import {
  names,
  skinColors,
  irisColors,
  clotheColors,
  hairColors,
} from "../data/characterAttributes";

export function genereteNewCharacter(id: number) {
  const rarity = (() => {
    const r = Math.random();
    if (r < 0.75) return 1; // 75%
    else if (r < 0.95) return 2; // 20%
    else return 3; // 5%
  })();

  const randomAge = Math.floor(Math.random() * (45 - 15 + 1)) + 15;

  const personalityAttributes = (() => {
    const totalPoints = 3 * rarity;
    const minPerAttr = 1;
    const attrs = 3;

    const remaining = totalPoints - minPerAttr * attrs;

    if (remaining < 0) {
      return { curiosity: 1, sociable: 1, brave: 1 };
    }

    const cut1 = Math.floor(Math.random() * (remaining + 1));
    const cut2 = Math.floor(Math.random() * (remaining + 1));
    const [first, second] = [cut1, cut2].sort((a, b) => a - b);

    const curiosity = minPerAttr + first;
    const sociable = minPerAttr + (second - first);
    const brave = minPerAttr + (remaining - second);

    return { curiosity, sociable, brave };
  })();

  const combatAttributes = (() => {
    const totalPoints = 2 * rarity;
    const minPerAttr = 1;
    const attrs = 2;

    const remaining = totalPoints - minPerAttr * attrs;
    if (remaining < 0) return { health: 1, attack: 1 };

    const cut = Math.floor(Math.random() * (remaining + 1));

    const health = minPerAttr + cut;
    const attack = minPerAttr + (remaining - cut);

    return { health, attack };
  })();

  const randomColors = (() => {
    const skinColor = Math.floor(Math.random() * skinColors.length);
    const irisColor = Math.floor(Math.random() * irisColors.length);
    const clotheColor = Math.floor(Math.random() * clotheColors.length);
    const hairColor = Math.floor(Math.random() * hairColors.length);
    return [skinColor, irisColor, clotheColor, hairColor];
  })();

  const character = {
    id: id,
    isCharacter: true,
    rarity: rarity,
    name: names[Math.floor(Math.random() * names.length)],
    age: randomAge,
    curiosity: personalityAttributes.curiosity,
    sociable: personalityAttributes.sociable,
    brave: personalityAttributes.brave,
    level: 1,
    health: combatAttributes.health,
    attack: combatAttributes.attack,
    colors: [
      skinColors[randomColors[0]][0], //piel
      skinColors[randomColors[0]][1], //piel sombra
      irisColors[randomColors[1]][0], //iris
      irisColors[randomColors[1]][1], //iris sombra
      clotheColors[randomColors[2]][0], //ropa
      clotheColors[randomColors[2]][1], //ropa sombra
      hairColors[randomColors[3]][0], //cabello luminoso
      hairColors[randomColors[3]][1], //cabello
      hairColors[randomColors[3]][2], //cabello sombra
    ],
  };

  return character;
}
