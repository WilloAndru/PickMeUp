import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PauseMenuProps = {
  setIsPause: (value: boolean) => void;
};

function PauseMenu({ setIsPause }: PauseMenuProps) {
  const [isHome, setIsHome] = useState(false);
  const navigate = useNavigate();

  const handleDeleteCharacters = () => {
    let chars = JSON.parse(localStorage.getItem("characters") || "[]");
    const selectedIds = JSON.parse(
      localStorage.getItem("selectedCharactersId") || "[]"
    );
    chars = chars.filter(
      (_: any, index: number) => !selectedIds.includes(index)
    );
    localStorage.setItem("characters", JSON.stringify(chars));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-full h-full absolute bg-black bg-opacity-50 z-10">
      {!isHome ? (
        <section className="flex flex-col box gap-4 z-20 text-center w-1/3">
          <h1>Pause Menu</h1>
          <button onClick={() => setIsHome(true)} className="link">
            Go to home
          </button>
          <button className="link" onClick={() => setIsPause(false)}>
            Return
          </button>
        </section>
      ) : (
        <section className="flex flex-col box gap-4 z-20 text-center w-1/3">
          <h1>Are you sure?</h1>
          <h1 className="text-2xl">
            If you return home in the middle of a level, you will lose your
            characters in battle.
          </h1>
          <button onClick={handleDeleteCharacters} className="link">
            Yes, I’m sure I want to go home
          </button>
          <button className="link" onClick={() => setIsHome(false)}>
            Cancel
          </button>
        </section>
      )}
    </div>
  );
}

export default PauseMenu;
