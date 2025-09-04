import { CanvasEntity } from "../classes/entity/CanvasEntity";
import Header from "../components/Header";

function ResultsGacha() {
  const lastGetCharacter = JSON.parse(
    localStorage.getItem("lastGetCharacter") || "{}"
  );

  return (
    <main className="flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-screen gap-8 p-8">
      <Header title="Gacha Results" showDiamonts={true} />
      <section className="flex flex-col gap-4 items-center box h-[90vh] w-full">
        <h1>You get a new character</h1>
        <CanvasEntity character={lastGetCharacter} scale={4} />
      </section>
    </main>
  );
}

export default ResultsGacha;
