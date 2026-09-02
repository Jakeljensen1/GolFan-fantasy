
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome to <b>GolFan!</b></h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          className="auth-input"
          value={form.email}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          className="auth-input"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="auth-button">
          Log In
        </button>
      </form>
      <Footer />
    </div>
  );
}

