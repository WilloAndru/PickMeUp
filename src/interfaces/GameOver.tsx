import { useNavigate } from "react-router-dom";

function GameOver() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-full absolute bg-black bg-opacity-50 z-10">
      <section className="flex flex-col box gap-4 z-20 text-center w-2/3 md:w-1/3">
        <h1>Game Over</h1>
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

export default GameOver;
