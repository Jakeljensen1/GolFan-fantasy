const Provider = require("./provider");
const axios = require("axios");

const BASE = "https://sports.core.api.espn.com/v2/sports/golf/leagues/pga";

class EspnProvider extends Provider {
  async getPlayers() {
    const res = await axios.get(`${BASE}/athletes`);
    return res.data.items; // ESPN returns list of $ref URLs
  }

  async getTournaments() {
    const res = await axios.get(`${BASE}/events`);
    return res.data.items; // list of $ref URLs
  }

  async getTournamentField(tournamentExternalId) {
    const res = await axios.get(`${BASE}/events/${tournamentExternalId}/competitors`);
    return res.data.items; // list of $ref URLs
  }

  async getLeaderboard(eventId, competitionId) {
    const res = await axios.get(
      `${BASE}/events/${eventId}/competitions/${competitionId}/leaderboard`
    );
    return res.data; // ESPN returns full leaderboard object
  }
}

module.exports = new EspnProvider();
