import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

// GET all tournaments
export async function getTournaments() {
  const res = await API.get("/tournaments");
  return res.data;
}

// GET single tournament
export async function getTournamentById(tournamentId) {
  const res = await API.get(`/tournaments/${tournamentId}`);
  return res.data;
}

// GET tournament field (TournamentEntry)
export async function getTournamentField(tournamentId) {
  const res = await API.get(`/tournaments/${tournamentId}/field`);
  return res.data; // array of TournamentEntry objects
}

// GET tournament results (TournamentResult)
export async function getTournamentResults(tournamentId) {
  const res = await API.get(`/tournaments/${tournamentId}/results`);
  return res.data;
}

