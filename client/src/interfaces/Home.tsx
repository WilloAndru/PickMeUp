import { useEffect } from "react";
import { Link } from "react-router-dom";
import Entity from "../classes/entity/Entity";

function Home() {
  useEffect(() => {
    // const characters = [
    //   {
    //     id: 0,
    //     isCharacter: true,
    //     image: "uwu.png",
    //     name: "Artemis",
    //     age: 25,
    //     gender: "female",
    //     curiosity: 80,
    //     sociable: 60,
    //     brave: 70,
    //     level: 1,
    //     health: 100,
    //     attack: 20,
    //     attackSpeed: 1.5,
    //     movementSpeed: 5,
    //   },
    //   {
    //     id: 1,
    //     isCharacter: true,
    //     image: "rex.png",
    //     name: "Rex",
    //     age: 30,
    //     gender: "male",
    //     curiosity: 65,
    //     sociable: 50,
    //     brave: 85,
    //     level: 2,
    //     health: 120,
    //     attack: 25,
    //     attackSpeed: 1.2,
    //     movementSpeed: 6,
    //   },
    //   {
    //     id: 2,
    //     isCharacter: true,
    //     image: "luna.png",
    //     name: "Luna",
    //     age: 22,
    //     gender: "female",
    //     curiosity: 90,
    //     sociable: 75,
    //     brave: 60,
    //     level: 1,
    //     health: 90,
    //     attack: 18,
    //     attackSpeed: 1.8,
    //     movementSpeed: 7,
    //   },
    // ];
    // localStorage.setItem("characters", JSON.stringify(characters));
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  }, []);

  return (
    <main className="flex flex-col bg-medieval-bg h-screen p-8 gap-8">
      <header>
        <h1 className="text-4xl h-[5vh]">Pick Me Up</h1>
      </header>
      <div className="flex flex-col md:flex-row gap-4 h-[95vh]">
        <Link
          to="/tower"
          className="link bg-[url('towerBg.jpg')] bg-cover bg-center h-full w-full md:w-[50vw]"
        >
          Tower
        </Link>
        <div className="flex flex-col gap-4 w-full md:w-[50vw] h-full">
          <Link
            to="/gacha"
            className="link bg-[url('gachaBg.jpg')] bg-cover bg-center h-2/4"
          >
            Gacha
          </Link>
          <Link
            to="/characters"
            className="link bg-[url('teamBg.jpg')] bg-cover bg-cente h-2/4"
          >
            Characters
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
