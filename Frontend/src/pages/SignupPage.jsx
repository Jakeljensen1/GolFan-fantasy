import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import styles from "../App.module.css";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.name, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Signup to Play!</h2>

        {error && <p className={styles.authError}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className={styles.authInput}
            value={form.name}
            onChange={handleChange}
          />

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
            Create Account!
          </button>
        </form>

        <div className={styles.authSwitch}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={styles.authLink}>
              Log in
            </Link>
          </p>
        </div>

      </div>
      <Footer />
    </div>
  );
}

