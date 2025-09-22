import { useEffect, useState } from "react";

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
    <section className="z-200 absolute top-[-30px] left-[26px] rounded border-2 border-[var(--color-gold)] bg-[var(--color-bg)] p-1 text-[6px]">
      <p>{character.name}</p>
      <div className="w-[50px] h-4 border-2 border-[var(--color-gold)] rounded bg-gray-200">
        <div
          className={`h-full ${lifeColor} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p>{character.level}</p>
      <p>{character.attack}</p>
      <p>{character.attackSpeed}</p>
      <p>{character.curiosity}</p>
      <p>{character.sociable}</p>
      <p>{character.brave}</p>
    </section>
  );
}

export default InformationEntity;
