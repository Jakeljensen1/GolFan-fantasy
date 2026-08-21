
import { useState } from "react";

const SignupPage = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/Dashboard"; // temporary redirect
  }

  return (
    // Eventually add a header here for the golfan brand
    <div className="auth-container">
      <h2 className="auth-title">Signup to Play!</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label
          htmlFor="name">Name:
        </label>
        <input
          type="text"
          name="name"
          className="auth-input"
          value={form.name}
          onChange={handleChange}>
        </input>

        <label
          htmlFor="email">Email:
        </label>
        <input
          type="text"
          name="email"
          className="auth-input"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}>
        </input>

        <label
          htmlFor="password">Password:
        </label>
        <input
          type="password"
          name="password"
          className="auth-input"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}>
        </input>

        <button
          type="submit"
          className="auth-button">Create Account!
        </button>
      </form>
    </div>
  )
}

export default SignupPage;