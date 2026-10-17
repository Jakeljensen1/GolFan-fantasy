import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// CREATE lineup
export async function createLineup(tournamentId, golferIds) {
  const res = await API.post("/lineups", {
    tournamentId,
    golferIds
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
  try {
    const res = await API.get("/lineups/user/all");
    return res.data;
  } catch (err) {
    console.error("getUserLineups error:", err);
    return []; // prevent crashes
  }
}


// Compute score for a lineup
export async function computeLineupScore(lineupId) {
  const res = await API.post(`/lineups/${lineupId}/compute-score`);
  return res.data;
}

// Get all lineups for a tournament
export async function getTournamentLeaderboard(tournamentId) {
  const res = await API.get(`/lineups/tournament/${tournamentId}/leaderboard`);
  return res.data;
}

