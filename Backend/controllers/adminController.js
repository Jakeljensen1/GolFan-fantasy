
module.exports.syncTournaments = async (req, res) => {
  try {
    // call external API or data source
    const updated = await syncTournamentData();
    res.json({ message: "Tournaments synced", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to sync tournaments" });
  }
};

module.exports.syncPlayers = async (req, res) => {
  try {
    // call external API or data source
    const updated = await syncPlayerData();
    res.json({ message: "Players synced", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to sync players" });
  }
};
module.exports.seedInitialData