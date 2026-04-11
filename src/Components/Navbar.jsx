import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    // Changed bg-orange-600 to a muted slate-900 for a premium dark look
    // Added a subtle border-bottom for definition
    <nav className="bg-slate-900 text-slate-100 px-8 py-4 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo - Kept font bold, but gave it a slight tracking (spacing) boost */}
        <Link to="/dashboard" className="text-xl font-bold tracking-tight hover:text-white transition-colors">
          Satsang Kendra Tezpur
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">

          {!token && (
            <div className="flex gap-6 text-sm font-medium text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:text-white transition-colors">
                Register
              </Link>
            </div>
          )}

          {token && (
            <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link to="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>

              {isAdmin && (
                <Link to="/admin" className="hover:text-white transition-colors">
                  Admin
                </Link>
              )}

              {/* Logout Button - Refined with a ghost-style border instead of bright white */}
              <button
                onClick={handleLogout}
                className="border border-slate-700 px-4 py-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;