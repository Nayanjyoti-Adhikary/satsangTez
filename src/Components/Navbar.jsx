import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.is_admin === 1;
    } catch (e) {
      console.error("Invalid token format");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="bg-slate-900 text-slate-100 px-4 py-3 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-lg md:text-xl font-bold tracking-tight hover:text-white"
        >
          Satsang Kendra Tezpur
        </Link>

        {/* Hamburger Button (Mobile Only) */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {!token && (
            <>
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/login" className="hover:text-white">Login</Link>
              <Link to="/register" className="hover:text-white">Register</Link>
            </>
          )}

          {token && (
            <>
              <Link to="/dashboard" className="hover:text-white">
                Dashboard
              </Link>

              {isAdmin && (
                <Link to="/admin" className="hover:text-white">
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="border border-slate-700 px-4 py-1.5 rounded-md hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium text-slate-300">

          {!token && (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}

          {token && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>

              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="border border-slate-700 px-4 py-2 rounded-md text-left hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;