import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.is_admin === 1;
    } catch (e) {
      console.error("Token error");
    }
  }

  const quotes = [
    "Service to man is service to God.",
    "Self-discipline builds true character.",
    "Let your conduct reflect your devotion.",
    "Discipline and love sustain spiritual life.",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    // Matches the "creamy grey" tone of our other pages
    <div className="min-h-screen bg-stone-100 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Simplified Header */}
        <header className="mb-12 border-l-4 border-slate-800 pl-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">
            Thakur Bhog Management
          </p>
        </header>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bhog Entry */}
          <div
            onClick={() => navigate("/thakur-bhog")}
            className="group bg-white p-8 rounded-xl border border-stone-200 shadow-sm cursor-pointer hover:border-slate-400 transition-all duration-300"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-600 transition-colors">
              Bhog Entry
            </h2>
            <p className="text-slate-500 text-sm">
              Record daily offerings.
            </p>
          </div>

          {/* Pronami Entry */}
          <div
            onClick={() => navigate("/box-pronami")}
            className="group bg-white p-8 rounded-xl border border-stone-200 shadow-sm cursor-pointer hover:border-slate-400 transition-all duration-300"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-600 transition-colors">
              Pronami Entry
            </h2>
            <p className="text-slate-500 text-sm">
              Log donation collections.
            </p>
          </div>

          {/* Admin Panel */}
          {isAdmin && (
            <div
              onClick={() => navigate("/admin")}
              className="group bg-slate-800 p-8 rounded-xl border border-slate-800 shadow-sm cursor-pointer hover:bg-slate-700 transition-all duration-300"
            >
              <h2 className="text-lg font-bold text-white mb-2">
                Administration
              </h2>
              <p className="text-slate-300 text-sm">
                System reports & data.
              </p>
            </div>
          )}
        </div>

        {/* Sliding Quote Section */}
        <div className="mt-24 text-center">
          <div className="max-w-xl mx-auto py-8 border-t border-stone-300">
            <p className="text-slate-400 italic font-serif text-lg animate-pulse">
              “{quotes[currentQuote]}”
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;