import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import styles from "../App.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>
          Welcome to <b>GolFan!</b>
        </h2>

        {error && <p className={styles.authError}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            className={styles.authInput}
            value={form.email}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={styles.authInput}
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" className={styles.authButton}>
            Log In
          </button>
        </form>

        <div className={styles.authSwitch}>
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className={styles.authLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}


