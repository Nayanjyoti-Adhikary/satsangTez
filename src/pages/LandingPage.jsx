import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-zinc-200">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            Live to Love,<br /> Love to Live
          </h1>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl">
            Do not make your mind clumsy --- good and bad always exist; the weak mind worries for the bad, the strong mind watches the bad and flourishes the good
          </p>

          <div className="flex justify-center md:justify-start gap-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-zinc-600 text-zinc-300 px-8 py-3 rounded-full hover:bg-zinc-800 transition duration-300"
            >
              Register
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="p-2 bg-zinc-800 rounded-2xl shadow-2xl">
            <img
              src="https://www.satsang.org.in/assets/Home/HeroSections/thakur_1.png"
              alt="Thakur Anukul Chandra"
              className="rounded-xl max-h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-white">
            About This Platform
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            This system manages Bhog and Pronami collections with discipline,
            transparency, and devotion — combining spiritual responsibility
            with structured financial management.
          </p>
        </div>
      </section>

      {/* QUOTES SECTION */}
      <section className="py-24 px-6 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg hover:bg-zinc-700 transition">
            <p className="italic text-zinc-300 text-lg">
              “Service to man is service to God.”
            </p>
          </div>

          <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg hover:bg-zinc-700 transition">
            <p className="italic text-zinc-300 text-lg">
              “Self-discipline is the foundation of spiritual growth.”
            </p>
          </div>

          <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg hover:bg-zinc-700 transition">
            <p className="italic text-zinc-300 text-lg">
              “Let your life radiate love and responsibility.”
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-zinc-500 text-center py-8 border-t border-zinc-800">
        © {new Date().getFullYear()} Thakur Bhog Management System
      </footer>

    </div>
  );
}

export default LandingPage;
