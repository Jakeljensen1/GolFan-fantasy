import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

// CREATE lineup
export async function createLineup(tournamentId, entryIds) {
  const res = await API.post("/lineups", {
    tournamentId,
    entryIds
  });
  return res.data;
}

// GET lineup by ID
export async function getLineup(lineupId) {
  const res = await API.get(`/lineups/${lineupId}`);
  return res.data;
}

// GET all lineups for logged-in user
export async function getUserLineups() {
  const res = await API.get("/lineups/user/all");
  return res.data;
}

// Compute score for a lineup
export async function computeLineupScore(lineupId) {
  const res = await API.post(`/lineups/${lineupId}/compute-score`);
  return res.data;
}

