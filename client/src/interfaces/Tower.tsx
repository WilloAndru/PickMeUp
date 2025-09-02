import { Link } from "react-router-dom";
import { towerLevelsData } from "../data/towerLevels/towerLevelsData";
import { FaHome } from "react-icons/fa";

function Tower() {
  let levels = [];
  const lastClearedLevel = JSON.parse(
    localStorage.getItem("lastClearedLevel") || "1"
  );

  for (let i = 1; i <= towerLevelsData.length; i++) {
    const isDisabled = i > lastClearedLevel; // mayor al último superado → bloqueado

    levels.push(
      <Link
        key={i}
        to={`/teamComposition/${i}`}
        className={`link ${isDisabled ? "disabled-link" : ""}`}
      >
        Level {i}
      </Link>
    );
  }

  return (
    <main className="flex flex-col items-center h-screen p-8 gap-8 ">
      <header className="flex justify-between items-center w-full md:w-[50vw]">
        <h1 className="text-4xl h-[5vh]">Tower levels</h1>
        <Link className="link" to="/">
          <FaHome />
        </Link>
      </header>
      <div className="box overflow-y-auto flex flex-col h-[95vh] p-8 gap-4 w-full md:w-[50vw]">
        {levels}
      </div>
    </main>
  );
}

export default Tower;
