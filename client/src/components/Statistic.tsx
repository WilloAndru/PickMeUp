import { FaRegHeart } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";
import { TbBowFilled, TbEyeSearch } from "react-icons/tb";
import { BiRun } from "react-icons/bi";
import { FaRegHandshake, FaBrave } from "react-icons/fa6";
import { useEffect, useState } from "react";

const icons = [
  FaRegHeart,
  LuSwords,
  TbBowFilled,
  BiRun,
  TbEyeSearch,
  FaRegHandshake,
  FaBrave,
];

const listAttributes = [
  "health",
  "attack",
  "attackSpeed",
  "movementSpeed",
  "curiosity",
  "sociable",
  "brave",
];

type StatisticProps = {
  attribute: string;
  attributeValue: number;
  index: number;
  isEditMode: boolean;
  setCountDiamonds: React.Dispatch<React.SetStateAction<number>>;
  setNewCharacter: React.Dispatch<React.SetStateAction<any>>;
};

function Statistic({
  attribute,
  attributeValue,
  index,
  isEditMode,
  setCountDiamonds,
  setNewCharacter,
}: StatisticProps) {
  const limit = JSON.parse(localStorage.getItem("diamonds") || "20");
  const Icon = icons[index];
  const [diamondComponent, setDiamondComponent] = useState(0);

  useEffect(() => {
    setDiamondComponent(0);
  }, [isEditMode]);

  const handleLevelUp = (isPlus: boolean) => {
    setCountDiamonds((prev) => {
      if (isPlus) {
        if (prev < limit) {
          setDiamondComponent((prev) => prev + 2);
          setNewCharacter((prev: any) => ({
            ...prev,
            level: prev.level + 0.5,
            [listAttributes[index]]: prev[listAttributes[index]] + 0.5,
          }));
          return prev + 2;
        } else {
          return prev;
        }
      } else {
        if (diamondComponent > 0) {
          setDiamondComponent((prev) => prev - 2);
          setNewCharacter((prev: any) => ({
            ...prev,
            level: prev.level - 0.5,
            [listAttributes[index]]: prev[listAttributes[index]] - 0.5,
          }));
          return prev - 2;
        } else {
          return prev;
        }
      }
    });
  };

  return (
    <section className="flex justify-between items-center">
      <h1 className="text-4xl flex gap-2 p-2">
        <Icon />
        {attribute}:
        <span className={diamondComponent !== 0 ? "text-green-500" : ""}>
          {attributeValue + diamondComponent / 4}
        </span>
      </h1>
      {isEditMode && (
        <div className="flex gap-2">
          <button
            className="w-12 h-13 border-4 border-[var(--color-gold)] rounded-2xl hover:border-[var(--color-gold-hover)]"
            onClick={() => handleLevelUp(false)}
          >
            -
          </button>
          <button
            className="w-12 h-13 border-4 border-[var(--color-gold)] rounded-2xl hover:border-[var(--color-gold-hover)]"
            onClick={() => handleLevelUp(true)}
          >
            +
          </button>
        </div>
      )}
    </section>
  );
}

export default Statistic;
