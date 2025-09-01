import { Link } from "react-router-dom";

function Home() {
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
