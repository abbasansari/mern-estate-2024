import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-600 text-yellow-50">
      <div className="flex items-center gap-44">
        <Link to="/" className=" font-bold mr-4 text-4xl ml-12">
          ansariEstates
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded-md text-black text-2xl focus:outline-none w-24 sm:w-64"
          />
          <FaSearch color="black" />
        </form>
      </div>
      <div className="flex items-center gap-6 mr-10">
        <Link to="/login" className="hidden sm:inline hover:underline">
          Signin
        </Link>

        <Link to="/" className="hidden sm:inline hover:underline">
          Home
        </Link>

        <Link to="/about" className="hidden sm:inline hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Header;
