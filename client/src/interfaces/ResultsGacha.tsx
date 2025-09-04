import { Link } from "react-router-dom";
import { CanvasEntity } from "../classes/entity/CanvasEntity";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa";

function ResultsGacha() {
  const lastGetCharacter = JSON.parse(
    localStorage.getItem("lastGetCharacter") || "{}"
  );

  return (
    <main className="flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-screen gap-8 p-8">
      <Header title="Gacha Results" showDiamonts={true} />
      <section className="flex flex-col items-center justify-around box h-[90vh] w-full text-center">
        <h1>You get a new character!</h1>
        <div className="flex flex-col gap-2 items-center">
          <h1>{lastGetCharacter.name}</h1>
          <CanvasEntity character={lastGetCharacter} scale={6} />
          <div className="flex gap-1">
            {Array.from({ length: lastGetCharacter.rarity }, (_, i) => (
              <FaStar key={i} className="text-2xl" />
            ))}
          </div>
        </div>
        <Link to={`/detailsCharacter/${lastGetCharacter.id}`} className="link">
          See details
        </Link>
      </section>
    </main>
  );
}

export default ResultsGacha;
