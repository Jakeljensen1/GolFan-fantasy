import { apiRequest } from "./api";

export const getAllGolfers = async () => {
  return apiRequest("/golfers", "GET");
};

export const getGolferById = async (id) => {
  return apiRequest(`/golfers/${id}`, "GET");
};
