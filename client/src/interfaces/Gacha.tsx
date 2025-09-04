import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GrDiamond } from "react-icons/gr";
import { useState } from "react";
import { RiInformation2Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function Gacha() {
  const navigate = useNavigate();
  const diamonts = JSON.parse(localStorage.getItem("diamonts") || "20");
  const costPull = 10;
  const [showAdvice, setShowAdvice] = useState(false);
  const [showProbabilities, setShowProbabilities] = useState(false);

  const handlePull = () => {
    if (diamonts >= costPull) {
      // localStorage.setItem("diamonts", JSON.stringify(diamonts - costPull));
      let characters = JSON.parse(localStorage.getItem("characters") || "[]");
      const lastId = characters.at(-1).id || 0;
      const character = {
        id: lastId + 1,
        isCharacter: true,
        rarity: 3,
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
      characters.push(character);
      localStorage.setItem("characters", JSON.stringify(characters));
      navigate("/resultsGacha");
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
          onClick={() => setShowProbabilities(true)}
          className="link absolute top-4 right-4"
        >
          <RiInformation2Fill className="text-4xl" />
        </button>
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
            You need {costPull - diamonts} <GrDiamond /> more to pull.
          </h1>
          <button className="link" onClick={() => setShowAdvice(false)}>
            Return
          </button>
        </section>
      )}
      {showProbabilities && (
        <section className="flex flex-col justify-center gap-4 box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <header className="flex items-center justify-between">
            <h1>Chances of Getting Rarity</h1>
            <button
              className="link"
              onClick={() => setShowProbabilities(false)}
            >
              <MdCancel />
            </button>
          </header>
          <section className="flex flex-col gap-2 ml-4">
            <div className="flex gap-2 items-center">
              <FaStar /> 75 %
            </div>
            <div className="flex gap-2 items-center">
              <FaStar />
              <FaStar /> 20 %
            </div>
            <div className="flex gap-2 items-center">
              <FaStar />
              <FaStar />
              <FaStar /> 5 %
            </div>
          </section>
          <h1 className="text-2xl mt-4">
            Higher rarity means higher base stats and intelligence.
          </h1>
        </section>
      )}
    </main>
  );
}

export default Gacha;
