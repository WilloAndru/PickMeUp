import { useNavigate } from "react-router-dom";
import { GrDiamond } from "react-icons/gr";

type ResultsMenuProps = {
  level: number;
  earnedDiamonds: number;
};

function ResultsMenu({ level, earnedDiamonds }: ResultsMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-full absolute bg-black bg-opacity-50 z-10">
      <section className="flex flex-col box gap-4 z-20 text-center items-center w-2/3 ">
        <h1>Level {level} completed</h1>
        <h1 className="flex items-center gap-1">
          You earned {earnedDiamonds} <GrDiamond className="text-3xl" />
        </h1>
        <button
          className="link"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to menu
        </button>
      </section>
    </div>
  );
}

export default ResultsMenu;
