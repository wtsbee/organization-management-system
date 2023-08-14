import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar bg-slate-500">
      <label htmlFor="my-drawer" className="btn btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <div>
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          組織管理システム
        </Link>
      </div>
    </header>
  );
};

export default Header;
