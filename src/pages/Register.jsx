import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "", //added email
    family_code: "",
    mandir_code: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // UI Success state

  // Using a reliable placeholder image
  const thakurImage = "https://www.satsang.org.in/assets/Home/HeroSections/acharyaDeb_1.png";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.username || !form.mobile || !form.password || !form.family_code) {
      setError("Please fill all required fields");
      return;
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(form.username)) {
      setError("Username must be 3-20 characters, start with a letter, and contain only letters, numbers, or underscore");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setError("Please Enter a Valid Mobile number");
      return;
    }
    if (!/^\d{12}$/.test(form.family_code.trim())) {
      setError("Family code must be exactly 12 digit");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          mobile: form.mobile,
          email: form.email,
          family_code: form.family_code,
          mandir_code: form.mandir_code,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login..."); // Changed from alert
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-6">
      
      {/* Container Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full border border-stone-200">
        
        {/* Left Side: Image Panel */}
        <div className="md:w-1/2 relative hidden md:block bg-slate-800">
          <img 
            src={thakurImage} 
            alt="Thakur Anukul Chandra" 
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to from-black/60 to-transparent flex items-end p-8">
            <p className="text-white text-lg font-medium italic">
              "To know Him is to know all."
            </p>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:w-1/2 p-8 md:p-10 bg-white">
          <h1 className="text-3xl font-bold mb-1 text-slate-800 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 mb-6 text-sm">Joi Guru and Welcome</p>

          {/* Error Message Block */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
              <p className="text-red-700 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Success Message Block */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
              <p className="text-green-700 text-xs font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
            />
            
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="family_code"
                placeholder="Family Code"
                value={form.family_code}
                onChange={handleChange}
                className="w-1/2 bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
              />
              <input
                type="text"
                name="mandir_code"
                placeholder="Mandir Code"
                value={form.mandir_code}
                onChange={handleChange}
                className="w-1/2 bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all text-sm"
            />

            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold shadow hover:bg-slate-900 transition-all active:scale-[0.98] mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-slate-500 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-slate-900 font-bold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;