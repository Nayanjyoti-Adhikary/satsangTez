import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ThakurBhog from "./pages/ThakurBhog";
import BoxPronami from "./pages/BoxPronami";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar";
import Password from "./pages/Password";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset-password" element={<Password />} />
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/thakur-bhog"
        element={
          <ProtectedRoute>
            <ThakurBhog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/box-pronami"
        element={
          <ProtectedRoute>
            <BoxPronami />
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  }
/>

    </Routes>
    </>
  );
}

export default App;
