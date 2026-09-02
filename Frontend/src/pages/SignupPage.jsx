
import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await signup(form.name, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Signup to Play!</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="auth-input"
          value={form.name}
          onChange={handleChange}
        />

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
          Create Account!
        </button>
      </form>
      <Footer />
    </div>
  );
}
