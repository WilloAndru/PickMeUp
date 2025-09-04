import { CanvasEntity } from "../classes/entity/CanvasEntity";

function Characters() {
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  return (
    <div>
      <CanvasEntity character={characters[0]} scale={8} />
    </div>
  );
}

export default Characters;
