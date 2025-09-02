import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full h-[10vh]">
      <h1 className="text-4xl">{title}</h1>
      <Link className="link" to="/">
        <FaHome />
      </Link>
    </header>
  );
}

export default Header;
