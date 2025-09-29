import { Link } from "react-router-dom";
import Header from "../components/Header";

function Tower() {
  // Obtenemos el ultimo nivel superado
  const lastClearedLevel = JSON.parse(
    localStorage.getItem("lastClearedLevel") || "1"
  );
  console.log(lastClearedLevel);

  // Generamos la lista de Links a los niveles
  let levels = [];
  for (let i = 1; i <= 10; i++) {
    const isDisabled = i > lastClearedLevel;
    levels.push(
      <Link
        key={i}
        to={`/teamComposition/${i}`}
        className={`link ${isDisabled ? "disabled-link" : ""}`} // Desabilitamos los niveles no superados
      >
        Level {i}
      </Link>
    );
  }

  return (
    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center h-screen p-8 gap-8 w-full md:w-[50vw]">
      <Header title="Tower levels" />
      <div className="box overflow-y-auto flex flex-col h-[95vh] p-8 gap-4 w-full">
        {levels}
      </div>
    </main>
  );
}

export default Tower;
