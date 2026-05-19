import {NavLink, useNavigate, useSearchParams} from "react-router-dom"
import { useCallback } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-slate-950 text-white shadow-sm"
        : "text-slate-600 hover:bg-white hover:text-slate-950"
    }`;
  const handleSearch = useCallback((value) => {
    const params = value ? `?q=${encodeURIComponent(value)}` : "";
    navigate(`/${params}`);
  }, [navigate]);

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[auto_minmax(280px,420px)_auto] lg:items-center lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
            N
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-950">NewsApp</span>
            <span className="block text-xs font-medium text-slate-500">Live headlines, clearly arranged</span>
          </span>
        </NavLink>

        <SearchBar key={query} value={query} onSearch={handleSearch} className="lg:order-none" />

        <div className="flex gap-2 overflow-x-auto pb-1 lg:justify-end lg:pb-0">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/category/technology" className={linkClass}>Technology</NavLink>
          <NavLink to="/category/sports" className={linkClass}>Sports</NavLink>
          <NavLink to="/category/business" className={linkClass}>Business</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
