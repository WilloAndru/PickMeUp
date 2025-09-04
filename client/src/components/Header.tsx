import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";

type HeaderProps = {
  title: string;
  showDiamonts?: boolean;
};

function Header({ title, showDiamonts = false }: HeaderProps) {
  const diamonts = JSON.parse(localStorage.getItem("diamonts") || "20");

  return (
    <header className="flex justify-between items-center w-full h-[10vh]">
      <h1 className="text-4xl">{title}</h1>
      <div className="flex gap-4">
        {showDiamonts && (
          <div className="text-3xl flex gap-4 items-center box p-4">
            <GrDiamond className="text-3xl" />
            {diamonts}
          </div>
        )}
        <Link className="link" to="/">
          <FaHome />
        </Link>
      </div>
    </header>
  );
}

export default Header;
