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
      const d = res.data;

      // NEW: handle raw array response
      if (Array.isArray(d)) return d;

      // Existing formats
      if (Array.isArray(d.field)) return d.field;
      if (Array.isArray(d.players)) return d.players;
      if (Array.isArray(d.entries)) return d.entries;
      if (Array.isArray(d.rows)) return d.rows;
      if (Array.isArray(d.results?.rows)) return d.results.rows;

      console.log("GolfData: Unknown field format:", d);
      return [];
    } catch (err) {
      if (err.response?.status === 404) {
        console.log(`field data not available for tournament ${tournamentId}`);
        return null;
      }
      throw err;
    }
  }


  async getLeaderboard(tournamentId) {
    try {
      const res = await axios.get(`${BASE}/tournaments/${tournamentId}/leaderboard`);
      return (
        res.data.entries || // key, following are fallbacks
        res.data.leaderboard ||
        res.data.players ||
        res.data.results?.rows ||
        []
      );
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