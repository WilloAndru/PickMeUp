import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { GrDiamond } from "react-icons/gr";
import Statistic from "../components/Statistic";

function DetailsCharacter() {
  const { id } = useParams();
  const character = JSON.parse(localStorage.getItem("characters") || "[]")[
    Number(id) - 1
  ];
  const [isEditMode, setIsEditMode] = useState(false);
  const [countDiamonds, setCountDiamonds] = useState(0);

  return (
    <main className="flex flex-col gap-4 p-8 h-screen">
      <Header title="Details Character" showDiamonts={true} />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="box text-start items-center justify-center flex flex-col gap-8">
          <h1 className="text-4xl flex gap-2">
            Level
            <span className={countDiamonds !== 0 ? "text-green-500" : ""}>
              {1 + countDiamonds / 2}
            </span>
          </h1>
          <CanvasEntity character={character} scale={8} />
          <div className="text-start flex flex-col gap-4">
            <h1 className="text-4xl">Name: {character.name}</h1>
            <h1 className="text-4xl">Age: {character.age}</h1>
            <div className="flex items-center gap-1">
              Rarity:
              {Array.from({ length: character.rarity }, (_, i) => (
                <FaStar key={i} className="text-4xl" />
              ))}
            </div>
          </div>
        </div>
        <div className="box flex flex-col justify-between gap-2">
          <Statistic
            attribute="Health"
            attributeValue={character.health}
            iconIndex={0}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          <Statistic
            attribute="Attack"
            attributeValue={character.attack}
            iconIndex={1}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          <Statistic
            attribute="Atk Speed"
            attributeValue={character.attackSpeed}
            iconIndex={2}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          <Statistic
            attribute="Mov Speed"
            attributeValue={character.movementSpeed}
            iconIndex={3}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          <Statistic
            attribute="Curiosity"
            attributeValue={character.curiosity}
            iconIndex={4}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          <Statistic
            attribute="Sociable"
            attributeValue={character.sociable}
            iconIndex={5}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          <Statistic
            attribute="Brave"
            attributeValue={character.brave}
            iconIndex={6}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
          />
          {!isEditMode ? (
            <button
              onClick={() => setIsEditMode(true)}
              className="link flex items-center justify-center gap-4"
            >
              <FiEdit />
              Level up
            </button>
          ) : (
            <footer className="flex justify-center gap-4">
              {countDiamonds !== 0 && (
                <button className="flex gap-2 items-center justify-center link w-1/2">
                  Cost: {countDiamonds} <GrDiamond />
                </button>
              )}
              <button
                className="link flex items-center justify-center gap-4 w-1/2"
                onClick={() => {
                  setIsEditMode(false);
                  setCountDiamonds(0);
                }}
              >
                Cancel
              </button>
            </footer>
          )}
        </div>
      </section>
    </main>
  );
}

export default DetailsCharacter;
