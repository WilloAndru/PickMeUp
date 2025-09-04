import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GrDiamond } from "react-icons/gr";
import { useState } from "react";

function Gacha() {
  const navigate = useNavigate();
  const diamonts = JSON.parse(localStorage.getItem("diamonts") || "20");
  const costPull = 10;
  const [showAdvice, setShowAdvice] = useState(false);

  const handlePull = () => {
    if (diamonts >= costPull) {
      navigate("/resultsGacha");
      // localStorage.setItem("diamonts", JSON.stringify(diamonts - costPull));
      const characters = JSON.parse(localStorage.getItem("characters") || "[]");
      const lastId = characters.at(-1).id;
      const character = {
        id: lastId + 1,
        isCharacter: true,
        name: "Leo",
        age: 25,
        gender: "female",
        curiosity: 80,
        sociable: 60,
        brave: 70,
        level: 1,
        health: 100,
        attack: 20,
        attackSpeed: 1.5,
        movementSpeed: 5,
        colors: [
          "#1a1a1a",
          "#f5f5f5",
          "#9e9e9e",
          "#ffdbac",
          "#a9745b",
          "#00bcd4",
          "#006064",
          "#4caf50",
          "#1b5e20",
          "#fff176",
          "#c62828",
          "#4e342e",
        ],
      };
      localStorage.setItem("lastGetCharacter", JSON.stringify(character));
    } else {
      setShowAdvice(true);
    }
  };

  return (
    <main className="flex flex-col w-screen h-screen p-8 gap-8">
      <Header title="Gacha" showDiamonts={true} />
      <section className="relative overflow-hidden flex items-center justify-center w-full h-[85vh] rounded-2xl border-4 border-[var(--color-gold)]">
        <img
          className="w-full h-full object-cover"
          src="gachaBg.jpg"
          alt="GachaBg"
        />
        <button
          className="flex items-center gap-2 link absolute bottom-4 right-4 "
          onClick={handlePull}
        >
          Pull by {costPull} <GrDiamond />
        </button>
      </section>
      {showAdvice && (
        <section className="flex flex-col items-center justify-center gap-4 box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1>You don&apos;t have enough money!</h1>
          <h1 className="flex items-center gap-2">
            You need {costPull - diamonts}
            <GrDiamond />
            more to pull.
          </h1>
          <button className="link" onClick={() => setShowAdvice(false)}>
            Return
          </button>
        </section>
      )}
    </main>
  );
}

export default Gacha;
