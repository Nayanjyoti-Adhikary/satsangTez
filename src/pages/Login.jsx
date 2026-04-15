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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  const backgroundImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Main_Gate_of_Satsang_Ashram%2C_Deoghar.jpg/960px-Main_Gate_of_Satsang_Ashram%2C_Deoghar.jpg?20200305181752";

  async function handleSendOtp() {
    setError("");
    setSuccess("");

    if (!mobile) {
      setError("Mobile number required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setSuccess("OTP sent to your mobile");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordLogin() {
    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Welcome Back
          </h1>
          <h2 className="text-sm text-slate-600 mt-1">Jai guru</h2>
        </div>

        {/* Toggle */}
        <div className="flex mb-8 p-1 bg-slate-200/50 rounded-lg">
          <button
            onClick={() => {
              setMode("otp");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold ${
              mode === "otp"
                ? "bg-slate-800 text-white"
                : "text-slate-600"
            }`}
          >
            OTP Login
          </button>

          <button
            onClick={() => {
              setMode("password");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold ${
              mode === "password"
                ? "bg-slate-800 text-white"
                : "text-slate-600"
            }`}
          >
            Password Login
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
            <p className="text-green-700 text-sm">{success}</p>
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
                className="w-full border p-3 rounded-lg"
              />

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-slate-800 text-white py-3 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="w-full bg-slate-800 text-white py-3 rounded-lg disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
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
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />

              <button
                onClick={handlePasswordLogin}
                disabled={loading}
                className="w-full bg-slate-800 text-white py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                onClick={() => navigate("/reset-password")}
                className="text-blue-600 underline text-sm"
              >
                Forgot Password?
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