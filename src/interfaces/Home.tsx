import { useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";

function Home() {
  const deleteData = () => {
    localStorage.removeItem("characters");
    localStorage.removeItem("diamonds");
    localStorage.removeItem("lastClearedLevel");
    window.location.reload();
  };

  const [showDeleteAdvice, setShowDeleteAdvice] = useState(false);

  return (
    <main className="flex flex-col h-screen p-8 gap-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl h-[5vh]">Pick Me Up</h1>
        <button className="link" onClick={() => setShowDeleteAdvice(true)}>
          <RiDeleteBin5Fill />
        </button>
      </header>
      <div className="flex flex-col md:flex-row gap-4 h-[95vh]">
        <Link
          to="/tower"
          className="text-gray-600 link bg-[url('/towerBg.jpg')] bg-cover bg-center h-full w-full md:w-[50vw]"
        >
          Tower
        </Link>
        <div className="flex flex-col gap-4 w-full md:w-[50vw] h-full">
          <Link
            to="/gacha"
            className="link bg-[url('/gachaBg.jpg')] bg-cover bg-center h-2/4"
          >
            Gacha
          </Link>
          <Link
            to="/characters"
            className="link bg-[url('/teamBg.jpg')] bg-cover bg-cente h-2/4"
          >
            Characters
          </Link>
        </div>
      </div>
      {showDeleteAdvice && (
        <section className="flex flex-col gap-8 text-center box w-[90vw] md:w-[50vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1>Are you sure you want to delete your data?</h1>
          <h1 className="text-2xl">
            If you do, you will lose all your characters and tower progress.
          </h1>
          <button className="link" onClick={deleteData}>
            Yes, I want delete it
          </button>
        </section>
      )}
    </main>
  );
}

export default Home;
