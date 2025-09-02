import { CharacterCanvas } from "../classes/entity/CanvasEntity";

function Characters() {
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  return (
    <div>
      <CharacterCanvas character={characters[0]} scale={8} />
      <CharacterCanvas character={characters[1]} scale={8} />
      <CharacterCanvas character={characters[2]} scale={8} />
    </div>
  );
}

export default Characters;
