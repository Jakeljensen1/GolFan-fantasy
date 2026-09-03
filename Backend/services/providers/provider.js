//contract every provider must follow... Allows us to swap between ESPn/GolfData/Sportrader without needing to touch our controllers
class Provider {
  async getPlayers() {
    throw new Error("Not implemented");
  }

  async getTournaments() {
    throw new Error("Not implemented");
  }

  async getTournamentField(tournamentExternalId) {
    throw new Error("Not implemented");
  }

  async getLeaderboard(tournamentExternalId) {
    throw new Error("Not implemented");
  }
}

module.exports = Provider;