import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/Dashboard"; // temporary redirect
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome to <b>GolFan!</b></h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          className="auth-input"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          className="auth-input"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <button type="submit" className="auth-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
