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
    <section className="absolute bottom-9">
      <img src="/Entity/icons/thinking.png" alt="thinking" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]">
        {icon}
      </div>
    </section>
  );
}

export default Thinking;
