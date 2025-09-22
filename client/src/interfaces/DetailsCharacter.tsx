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
  let characters = JSON.parse(localStorage.getItem("characters") || "[]");
  const character = characters[Number(id) - 1];
  const [newCharacter, setNewCharacter] = useState(character);
  const [isEditMode, setIsEditMode] = useState(false);
  const [countDiamonds, setCountDiamonds] = useState(0);

  // Cuando se quieran comfirmar los cambios de las estadisticas
  const handleUpdateStatistics = () => {
    characters[Number(id) - 1] = newCharacter;
    localStorage.setItem("characters", JSON.stringify(characters));
    let diamonds = JSON.parse(localStorage.getItem("diamonds") || "20");
    localStorage.setItem("diamonds", JSON.stringify(diamonds - countDiamonds));
    window.location.reload();
  };

  return (
    <main className="flex flex-col gap-4 p-8 h-screen">
      <Header title="Details Character" showDiamonts={true} />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="box text-start items-center justify-center flex flex-col gap-8">
          <h1 className="text-4xl flex gap-2">
            Level
            <span className={countDiamonds !== 0 ? "text-green-500" : ""}>
              {character.level + countDiamonds / 2}
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
            index={0}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
          />
          <Statistic
            attribute="Attack"
            attributeValue={character.attack}
            index={1}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
          />
          <Statistic
            attribute="Atk Speed"
            attributeValue={character.attackSpeed}
            index={2}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
          />
          <Statistic
            attribute="Mov Speed"
            attributeValue={character.movementSpeed}
            index={3}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
          />
          <Statistic
            attribute="Curiosity"
            attributeValue={character.curiosity}
            index={4}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
          />
          <Statistic
            attribute="Sociable"
            attributeValue={character.sociable}
            index={5}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
          />
          <Statistic
            attribute="Brave"
            attributeValue={character.brave}
            index={6}
            isEditMode={isEditMode}
            setCountDiamonds={setCountDiamonds}
            setNewCharacter={setNewCharacter}
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
                <button
                  onClick={handleUpdateStatistics}
                  className="flex gap-1 items-center justify-center link w-1/2"
                >
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
