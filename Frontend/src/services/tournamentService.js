import { apiRequest } from "./api";

export const getTournaments = async () => {
  return apiRequest("/tournaments", "GET");
};

export const getTournamentById = async (id) => {
  return apiRequest(`/tournaments/${id}`, "GET");
};

export const getTournamentGolfers = async (id) => {
  return apiRequest(`/tournaments/${id}/golfers`, "GET");
};
