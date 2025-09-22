import { type JSX } from "react";
import {
  FaRegFaceLaughBeam,
  FaRegFaceAngry,
  FaRegFaceGrimace,
} from "react-icons/fa6";

type ThinkingProps = {
  feeling: string;
};

function Thinking({ feeling }: ThinkingProps) {
  let icon: JSX.Element;

  switch (feeling) {
    case "Fear":
      icon = <FaRegFaceGrimace />;
      break;
    case "Happy":
      icon = <FaRegFaceLaughBeam />;
      break;
    case "Angry":
      icon = <FaRegFaceAngry />;
      break;
    default:
      icon = <FaRegFaceGrimace />;
      break;
  }

  return (
    <section className="absolute bottom-8">
      <img src="/Entity/icons/thinking.png" alt="thinking" />
      <div className="absolute bottom-[4px] left-[3px]">{icon}</div>
    </section>
  );
}

export default Thinking;
