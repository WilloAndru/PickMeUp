import { useEffect } from "react";
import { Link } from "react-router-dom";
import Entity from "../classes/entity/Entity";

function Home() {
  useEffect(() => {
    // const characterss = [
    //   {
    //     id: 0,
    //     isCharacter: true,
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
    //     colors: [
    //       "#1a1a1a",
    //       "#f5f5f5",
    //       "#9e9e9e",
    //       "#ffdbac",
    //       "#a9745b",
    //       "#00bcd4",
    //       "#006064",
    //       "#4caf50",
    //       "#1b5e20",
    //       "#fff176",
    //       "#c62828",
    //       "#4e342e",
    //     ],
    //   },
    //   {
    //     id: 1,
    //     isCharacter: true,
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
    //     colors: [
    //       "#000000",
    //       "#ffffff",
    //       "#7d7d7d",
    //       "#f1c27d",
    //       "#8d5524",
    //       "#1e90ff",
    //       "#2a4d8f",
    //       "#3b82f6",
    //       "#1e40af",
    //       "#f5deb3",
    //       "#8b4513",
    //       "#2f1b0c",
    //     ],
    //   },
    //   {
    //     id: 2,
    //     isCharacter: true,
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
    //     colors: [
    //       "#2d2d2d",
    //       "#e0e0e0",
    //       "#b0b0b0",
    //       "#ffe0bd",
    //       "#7d4b2b",
    //       "#6a5acd",
    //       "#311b92",
    //       "#ff9800",
    //       "#e65100",
    //       "#ffb74d",
    //       "#5d4037",
    //       "#212121",
    //     ],
    //   },
    // ];
    // localStorage.setItem("characters", JSON.stringify(characterss));
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
