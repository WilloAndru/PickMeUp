import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { GrDiamond } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";
import { TbBowFilled } from "react-icons/tb";
import { BiRun } from "react-icons/bi";
import { TbEyeSearch } from "react-icons/tb";
import { FaRegHandshake } from "react-icons/fa6";
import { FaBrave } from "react-icons/fa6";

function DetailsCharacter() {
  const { id } = useParams();
  const character = JSON.parse(localStorage.getItem("characters") || "[]")[
    Number(id) - 1
  ];
  const [isEditMode, setIsEditMode] = useState(false);
  const [countDiamonts, setCountDiamonts] = useState(0);

  return (
    <main className="flex flex-col gap-4 p-8 h-screen">
      <Header title="Details Character" showDiamonts={true} />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="box text-start items-center justify-center flex flex-col gap-8">
          <h1 className="text-4xl">Level {character.level}</h1>
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
        <div className="box flex flex-col justify-between gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <FaRegHeart />
              Health: {character.health}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <LuSwords />
              Attack: {character.attack}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <TbBowFilled />
              Atk Speed: {character.attackSpeed}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <BiRun />
              Mov Speed: {character.movementSpeed}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <TbEyeSearch />
              Curiosity: {character.curiosity}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <FaRegHandshake />
              Sociable: {character.sociable}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl flex gap-2">
              <FaBrave />
              Brave: {character.brave}
            </h1>
            <div className="flex gap-2">
              <button className="">-</button>
              <button>+</button>
            </div>
          </div>
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
              {countDiamonts !== 0 && (
                <button className="flex gap-2 items-center link">
                  Save for {countDiamonts} <GrDiamond />
                </button>
              )}
              <button
                className="link flex items-center justify-center gap-4"
                onClick={() => setIsEditMode(false)}
              >
                <MdOutlineCancel />
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
