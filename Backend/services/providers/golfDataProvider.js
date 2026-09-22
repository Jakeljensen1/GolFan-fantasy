const Provider = require("./provider");
const axios = require("axios");

const BASE = "https://api.golfdataapi.com/v1";

class GolfDataProvider extends Provider {
  async getPlayers(offset = 0, limit = 50) {
    const res = await axios.get(`${BASE}/players`, {
      params: { offset, limit }
    });
    //console.log("GolfData players response:", res.data);
    return res.data || []; //Include || to not break our sync
  }
  async getTournaments() {
    const res = await axios.get(`${BASE}/tournaments`);
    return res.data || [];
  }
  async getTournamentField(tournamentId) {
    try {
      const res = await axios.get(`${BASE}/tournaments/${tournamentId}/field`);
      return res.data || [];
    } catch (err) {
      if (err.response?.status === 404) {
        console.log(`field data not available for tournament ${tournamentId}`);
        return null;
      }

    }
  }
  async getLeaderboard(tournamentId) {
    try {
      const res = await axios.get(`${BASE}/tournaments/${tournamentId}/leaderboard`);
      return res.data || [];
    } catch (err) {
      if (err.response?.status === 404) {
        console.log(`GolfData: No leaderboard available for tournament ${tournamentId}`);
        return null;
      }
      throw err;
    }
  }
}

module.exports = new GolfDataProvider();