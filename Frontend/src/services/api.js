// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiRequest = async (endpoint, method = "GET", body = null, auth = false) => {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  };

  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "API request failed");
  }

  return res.json();
};
