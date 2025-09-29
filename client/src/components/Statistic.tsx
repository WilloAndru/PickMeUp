import { useEffect, useState } from "react";
import { listAttributes, icons } from "../data/dataStatistics";

type StatisticProps = {
  cost: number;
  attribute: string;
  attributeValue: number;
  index: number;
  isEditMode: boolean;
  setCountDiamonds: React.Dispatch<React.SetStateAction<number>>;
  setNewCharacter: React.Dispatch<React.SetStateAction<any>>;
};

export default function Statistic({
  cost,
  attribute,
  attributeValue,
  index,
  isEditMode,
  setCountDiamonds,
  setNewCharacter,
}: StatisticProps) {
  const limitDiamonds = Number(localStorage.getItem("diamonds") || "20");
  const Icon = icons[index];
  const [levelsAdded, setLevelsAdded] = useState(0); // Niveles del personaje
  const displayedLevel = attributeValue + levelsAdded; // Nivel actual del atributo

  useEffect(() => {
    setLevelsAdded(0);
  }, [isEditMode]);

  const addLevel = () => {
    const maxAddable = 10 - attributeValue;
    if (levelsAdded >= maxAddable) return;

    setCountDiamonds((spentSoFar) => {
      const available = limitDiamonds - spentSoFar;
      if (available < cost) return spentSoFar;
      setLevelsAdded((l) => l + 1);
      setNewCharacter((prev: any) => ({
        ...prev,
        level: prev.level + 1,
        [listAttributes[index]]: prev[listAttributes[index]] + 1,
      }));

      return spentSoFar + cost;
    });
  };

  const removeLevel = () => {
    if (levelsAdded <= 0) return;

    setCountDiamonds((spentSoFar) => {
      if (spentSoFar < cost) return spentSoFar;

      setLevelsAdded((l) => l - 1);
      setNewCharacter((prev: any) => ({
        ...prev,
        level: prev.level - 1,
        [listAttributes[index]]: prev[listAttributes[index]] - 1,
      }));

      return spentSoFar - cost;
    });
  };

  return (
    <section className="flex justify-between items-center">
      <h1 className="text-4xl flex gap-2 p-2">
        <Icon />
        {attribute}:
        <span className={levelsAdded !== 0 ? "text-green-500" : ""}>
          {displayedLevel}
        </span>
      </h1>

      {isEditMode && (
        <div className="flex gap-2">
          <button
            className="w-12 border-4 border-[var(--color-gold)] rounded-2xl"
            onClick={removeLevel}
          >
            −
          </button>
          <button
            className="w-12 border-4 border-[var(--color-gold)] rounded-2xl"
            onClick={addLevel}
          >
            +
          </button>
        </div>
      )}
    </section>
  );
}
