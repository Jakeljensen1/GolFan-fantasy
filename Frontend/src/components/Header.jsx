import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      {/* Left: Brand */}
      <div className={styles.brandContainer}>
        <Link to="/dashboard" className={styles.brand}>
          GolFan
        </Link>
      </div>

      {/* Right: Nav Buttons */}
      <div className={styles.navRight}>
        <Link to="/dashboard" className={styles.navButtonLink}>
          Dashboard
        </Link>

        <button onClick={handleLogout} className={styles.navButton}>
          Logout
        </button>
      </div>
    </header>
  );
}



