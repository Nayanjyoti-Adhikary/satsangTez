import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Password() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State for UI success messages

  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  async function handleSendOtp() {
    setError("");
    setSuccess("");
    if (!mobile) return setError("Mobile number required");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setSuccess("OTP sent to your mobile"); // Changed from alert
      } else setError(data.message);
    } catch {
      setError("Server not reachable");
    }
  }

  async function handleVerify() {
    setError("");
    setSuccess("");
    if (!otp) return setError("Please enter OTP");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verifyforPass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setSuccess("OTP Verified successfully"); // Optional feedback
      } else setError(data.message);
    } catch {
      setError("Server not reachable");
    }
  }

  async function handleChangePassword() {
    setError("");
    setSuccess("");
    if (!newPassword) return setError("Password is required");

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password changed successfully. Redirecting..."); // Changed from alert
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else setError(data.message);
    } catch {
      setError("Server not reachable");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-5">
        
        <h2 className="text-2xl font-semibold text-center text-slate-700">
          Reset Password
        </h2>

        {/* Mobile */}
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={otpSent}
          className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition"
        />

        {/* Send OTP */}
        {!otpSent && (
          <button
            onClick={handleSendOtp}
            className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition active:scale-[0.98]"
          >
            Send OTP
          </button>
        )}

        {/* OTP Section */}
        {otpSent && !isVerified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition"
            />

            <button
              onClick={handleVerify}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition active:scale-[0.98]"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* New Password */}
        {isVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition"
            />

            <button
              onClick={handleChangePassword}
              className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-lg font-semibold transition active:scale-[0.98]"
            >
              Change Password
            </button>
          </>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-300 text-green-600 text-sm p-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Password;