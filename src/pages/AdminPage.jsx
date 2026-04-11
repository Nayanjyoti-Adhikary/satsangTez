import { useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API_BASE_URL from "../config/api";

function AdminPage() {
  const [bhogEntries, setBhogEntries] = useState([]);
  const [pronamiEntries, setPronamiEntries] = useState([]);
  const [bhogSummary, setBhogSummary] = useState([]);
  const [pronamiSummary, setPronamiSummary] = useState([]);
  const [view, setView] = useState("bhog");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const navigate = useNavigate();

  // 🔐 Authentication & Fetch
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.log("Invalid token");
      navigate("/");
      return;
    }

    if (decoded.is_admin !== 1) {
      navigate("/dashboard");
      return;
    }

    fetchData(token);
  }, [selectedYear, navigate]);

  async function fetchData(token) {
    try {
      const [bhogRes, pronamiRes, bhogSumRes, pronamiSumRes] =
        await Promise.all([
          fetch(`${API_BASE_URL}/bhog/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/pronami/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${API_BASE_URL}/bhog/monthly-summary/${selectedYear}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          fetch(
            `${API_BASE_URL}/pronami/monthly-summary/${selectedYear}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

      // ✅ Check response status
      if (!bhogRes.ok || !pronamiRes.ok || !bhogSumRes.ok || !pronamiSumRes.ok) {
        throw new Error("API fetch failed");
      }

      const bhogData = await bhogRes.json();
      const pronamiData = await pronamiRes.json();
      const bhogSumData = await bhogSumRes.json();
      const pronamiSumData = await pronamiSumRes.json();

      setBhogEntries(bhogData || []);
      setPronamiEntries(pronamiData || []);
      setBhogSummary(bhogSumData || []);
      setPronamiSummary(pronamiSumData || []);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  // 💰 Currency Formatter
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const currentData =
    view === "bhog" ? bhogEntries : pronamiEntries;

  const currentTotal = currentData.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const bhogYearTotal = bhogSummary.reduce(
    (sum, item) => sum + Number(item.total_amount || 0),
    0
  );

  const pronamiYearTotal = pronamiSummary.reduce(
    (sum, item) => sum + Number(item.total_amount || 0),
    0
  );

  const combinedYearTotal = bhogYearTotal + pronamiYearTotal;

  // 📊 Chart Data
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const chartData = useMemo(() => {
    return [...Array(12)].map((_, index) => {
      const month = index + 1;

      const bhogMonth =
        bhogSummary.find((item) => item.month === month)
          ?.total_amount || 0;

      const pronamiMonth =
        pronamiSummary.find((item) => item.month === month)
          ?.total_amount || 0;

      return {
        month: monthNames[index],
        Bhog: Number(bhogMonth),
        Pronami: Number(pronamiMonth),
      };
    });
  }, [bhogSummary, pronamiSummary]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Admin Financial Dashboard
        </h1>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded shadow"
        >
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">
            Bhog Total ({selectedYear})
          </h2>
          <p className="text-2xl font-bold">
            {formatCurrency(bhogYearTotal)}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">
            Pronami Total ({selectedYear})
          </h2>
          <p className="text-2xl font-bold">
            {formatCurrency(pronamiYearTotal)}
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-2">
            Combined Total ({selectedYear})
          </h2>
          <p className="text-2xl font-bold">
            {formatCurrency(combinedYearTotal)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6">
          Monthly Comparison ({selectedYear})
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="Bhog" fill="#16a34a" />
            <Bar dataKey="Pronami" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Toggle */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setView("bhog")}
          className={`px-4 py-2 rounded shadow ${
            view === "bhog"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Bhog Entries
        </button>

        <button
          onClick={() => setView("pronami")}
          className={`px-4 py-2 rounded shadow ${
            view === "pronami"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Pronami Entries
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Depositor</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Username</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id || index} className="border-t">
                <td className="p-3">{item.depositor}</td>
                <td className="p-3">
                  {formatCurrency(item.amount)}
                </td>
                <td className="p-3">
                  {view === "bhog"
                    ? item.bhog_type
                    : item.collection_type}
                </td>
                <td className="p-3">
                  {view === "bhog"
                    ? item.date_of_deposit
                    : item.date_of_entry}
                </td>
                <td className="p-3">{item.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-6 font-semibold text-lg">
        Current View Total: {formatCurrency(currentTotal)}
      </div>
    </div>
  );
}

export default AdminPage;