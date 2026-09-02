import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/dashboard" className="brand">
          GolFan
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        {/* Add more links later: Leaderboard, Profile, etc. */}
      </nav>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </header>
  );
}
