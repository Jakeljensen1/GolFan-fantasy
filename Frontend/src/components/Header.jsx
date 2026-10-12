import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Hide back button on main pages
  const hideBack =
    location.pathname === "/dashboard" ||
    location.pathname === "/profile" ||
    location.pathname === "/login";

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {!hideBack && (
          <button className={styles.backButton} onClick={handleBack}>
            ←
          </button>
        )}

        <Link to="/dashboard" className={styles.brand}>
          GolFan
        </Link>
      </div>

      <div className={styles.navRight}>
        <Link to="/dashboard" className={styles.navButtonLink}>
          Home
        </Link>

        <Link to="/profile" className={styles.navButtonLink}>
          Profile
        </Link>

        <button onClick={handleLogout} className={styles.navButton}>
          Logout
        </button>
      </div>
    </header>
  );
}




