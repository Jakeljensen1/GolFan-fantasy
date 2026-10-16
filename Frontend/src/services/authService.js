import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});


export async function signup(name, email, password) {
  const res = await API.post("/auth/signup", { name, email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await API.post("/auth/logout");
  return res.data;
}

export async function getLoggedInUser() {
  const res = await API.get("/auth/user");
  return res.data;
}



