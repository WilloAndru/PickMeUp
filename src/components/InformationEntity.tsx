import { useEffect, useState } from "react";
import { icons } from "../data/dataStatistics";
import React from "react";

type InformationEntityProps = {
  character: any;
  currentHealth: any;
};

function InformationEntity({
  character,
  currentHealth,
}: InformationEntityProps) {
  const percent = (currentHealth / character.health) * 100;
  const [lifeColor, setLifeColor] = useState("bg-green-500");

  // Cambios del color de vida segun el porcentaje de vida actual
  useEffect(() => {
    if (percent > 50) {
      setLifeColor("bg-green-500");
    } else if (percent > 20) {
      setLifeColor("bg-yellow-500");
    } else {
      setLifeColor("bg-red-500");
    }
  }, [percent]);

  return (
    <section className="flex flex-col gap-[1px] z-200 absolute left-[26px] rounded border-2 border-[var(--color-gold)] bg-[var(--color-bg)] p-1 text-[6px]">
      <p>{character.name}</p>
      <p>Level {character.level}</p>
      <div className="flex items-center gap-1">
        {React.createElement(icons[0])}
        <div className="w-[40px] h-[8px] border-2 border-[var(--color-gold)] rounded bg-gray-200">
          <div
            className={`h-full ${lifeColor} transition-all duration-300 rounded-sm`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {React.createElement(icons[1])}
        <p>{character.attack}</p>
      </div>
      <div className="flex items-center gap-1">
        {React.createElement(icons[2])}
        <p>{character.curiosity}</p>
      </div>
      <div className="flex items-center gap-1">
        {React.createElement(icons[3])}
        <p>{character.sociable}</p>
      </div>
      <div className="flex items-center gap-1">
        {React.createElement(icons[4])}
        <p>{character.brave}</p>
      </div>
    </section>
  );
}

export default InformationEntity;
