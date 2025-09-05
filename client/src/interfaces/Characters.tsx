import { Link } from "react-router-dom";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa";

function Characters() {
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  return (
    <main className="flex flex-col items-center h-screen p-[4vh] gap-[4vh]">
      <Header title="Collected characters" />
      <section className="box grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-[2vh] w-full h-[78vh] overflow-y-auto">
        {characters.map((item: any, index: number) => {
          return (
            <Link
              key={index}
              to={`/detailsCharacter/${item.id}`}
              className="link flex flex-col items-center justify-center gap-2 h-[35.3vh]"
            >
              <h1 className="text-2xl">{item.name}</h1>
              <h1 className="text-2xl">Lvl {item.level}</h1>
              <CanvasEntity character={item} scale={4} />
              <div className="flex gap-1">
                {Array.from({ length: item.rarity }, (_, i) => (
                  <FaStar key={i} className="text-2xl" />
                ))}
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default Characters;
