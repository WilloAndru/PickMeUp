import { useParams, useNavigate } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Header from "../components/Header";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function TeamComposition() {
  const navigate = useNavigate();
  // Logica para evitar saltos de nivel por la URL
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const numberSpots =
    Math.ceil(Number(level) / 2) >= 5 ? 4 : Math.ceil(Number(level) / 2);

  const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
  const [isTeamComplete, setIsTeamComplete] = useState(false);

  const handleCharacters = (index: number) => {
    setSelectedCharacters((prev: number[]) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else if (prev.length >= numberSpots) {
        return [...prev.slice(1), index];
      } else {
        return [...prev, index];
      }
    });
  };

  useEffect(() => {
    selectedCharacters.length === numberSpots
      ? setIsTeamComplete(true)
      : setIsTeamComplete(false);
  }, [selectedCharacters]);

  return (
    <main className="flex flex-col items-center h-screen p-[4vh] gap-[4vh]">
      <Header title="Team Composition" />
      <div className="flex flex-col md:flex-row gap-[4vh] w-full h-[78vh]">
        <section className="flex flex-col box overflow-y-auto w-full md:w-1/2 h-1/2 md:h-full gap-[2vh]">
          <header className="h-[5vh] flex justify-between">
            <h1>Level {level}</h1>
            <h1>
              {selectedCharacters.length} / {numberSpots}
            </h1>
          </header>
          <section className="h-[54vh] gap-[2vh] grid grid-cols-2 auto-rows-auto">
            {selectedCharacters.map((index) => (
              <button
                className="link flex items-center justify-center h-[24.5vh]"
                key={index}
                onClick={() => handleCharacters(index)}
              >
                <CanvasEntity character={characters[index]} scale={4} />
              </button>
            ))}
          </section>
          <button
            className={`link ${!isTeamComplete ? "disabled-link" : ""}`}
            disabled={!isTeamComplete}
            onClick={() => {
              localStorage.setItem(
                "selectedCharacters",
                JSON.stringify(selectedCharacters)
              );
              navigate(`/battlefield/${level}`);
            }}
          >
            {isTeamComplete ? "Go to battle" : "Complete your team"}
          </button>
        </section>
        <section className="box w-full md:w-1/2 overflow-y-auto h-1/2 md:h-full p-[2vh] gap-[2vh] grid grid-cols-2 auto-rows-auto">
          {characters.map((item: any, index: number) => (
            <button
              className={`flex flex-col items-center justify-center gap-2 h-[35vh] p-4 rounded-2xl border-4 border-[var(--color-gold)] ${
                selectedCharacters.includes(index)
                  ? "bg-[var(--color-green)]"
                  : "bg-[var(--color-bg)]"
              }`}
              key={index}
              onClick={() => handleCharacters(index)}
            >
              <h1 className="text-2xl">{item.name}</h1>
              <h1 className="text-2xl">Level {item.level}</h1>
              <CanvasEntity character={item} scale={3} />
              <div className="flex gap-1">
                {Array.from({ length: item.rarity }, (_, i) => (
                  <FaStar key={i} className="text-2xl" />
                ))}
              </div>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

export default TeamComposition;
