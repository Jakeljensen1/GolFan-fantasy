import { apiRequest } from "./api";

// Signup
export const signup = async (name, email, password) => {
  const data = await apiRequest("/auth/signup", "POST", { name, email, password });
  localStorage.setItem("token", data.token);
  return data.user;
};

// Login
export const login = async (email, password) => {
  const data = await apiRequest("/auth/login", "POST", { email, password });
  localStorage.setItem("token", data.token);
  return data.user;
};

// GET logged in user
export const getLoggedInUser = async () => {
  return apiRequest("/auth/user", "GET", null, true);
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};
