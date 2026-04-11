import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("otp");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const backgroundImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Main_Gate_of_Satsang_Ashram%2C_Deoghar.jpg/960px-Main_Gate_of_Satsang_Ashram%2C_Deoghar.jpg?20200305181752";

  async function handleSendOtp() {
    setError("");

    if (!mobile) {
      setError("Mobile number required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent to your email");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server not reachable");
    }
  }

  async function handleVerifyOtp() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server not reachable");
    }
  }

  async function handlePasswordLogin() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server not reachable");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
      }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        {/* ✅ FIXED HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Welcome Back
          </h1>
          <h2 className="text-sm text-slate-600 mt-1">
            Jai guru
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex mb-8 p-1 bg-slate-200/50 rounded-lg">
          <button
            onClick={() => setMode("otp")}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${
              mode === "otp"
                ? "bg-slate-800 text-white shadow-lg"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            OTP Login
          </button>

          <button
            onClick={() => setMode("password")}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${
              mode === "password"
                ? "bg-slate-800 text-white shadow-lg"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Password Login
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {mode === "otp" && (
            <>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-white/50 border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all"
              />

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-[0.98]"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-white/50 border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-[0.98]"
                  >
                    Verify & Login
                  </button>
                </>
              )}
            </>
          )}

          {mode === "password" && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/50 border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
              />

              <button
                onClick={handlePasswordLogin}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-[0.98]"
              >
                Login
              </button>
            </>
          )}
        </div>

        <p className="text-center mt-6 text-slate-500 text-xs">
          Secure Login for Thakur Bhog Services
        </p>
      </div>
    </div>
  );
}

export default Login;