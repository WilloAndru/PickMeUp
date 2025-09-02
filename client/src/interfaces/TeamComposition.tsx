import { useParams } from "react-router-dom";
import { restrictLevelsByURL } from "../utils/restrictLevelsByURL";
import Header from "../components/Header";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import { useState } from "react";

function TeamComposition() {
  // Logica para evitar saltos de nivel por la URL
  const { level } = useParams();
  const restriction = restrictLevelsByURL(Number(level), "tower");
  if (restriction) return restriction;

  const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  const [selectCharacters, setSelectCharacters] = useState([0]);

  return (
    <main className="flex flex-col items-center h-screen p-[4vh] gap-[4vh]">
      <Header title="Team Composition" />
      <div className="flex flex-col md:flex-row gap-[4vh] w-full h-[78vh]">
        <section className="box w-full md:w-1/2 h-full"></section>
        <section className="box w-full md:w-1/2 overflow-y-auto h-full p-[2vh] gap-[2vh] grid grid-cols-2 auto-rows-auto ">
          {characters.map((item: any, index: number) => (
            <button
              className="link flex flex-col items-center justify-center gap-2 h-[35.5vh]"
              key={index}
              onClick={() => {
                setSelectCharacters((prev: number[]) => [...prev, index]);
              }}
            >
              <CanvasEntity character={item} scale={4} />
              <h1>{item.name}</h1>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

export default TeamComposition;
