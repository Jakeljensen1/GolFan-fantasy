// services/sync/tournamentSync.js
const Tournament = require("../../models/Tournament");
const provider = require("../providers/espnProvider");
const mapper = require("../providers/mapper");
const axios = require('axios');

async function syncTournaments() {
  try {
    const items = await provider.getTournaments();

    const tournaments = [];
    for (const item of items) {
      const full = await axios.get(item.$ref);
      tournaments.push(full.data);
    }

    await Tournament.bulkWrite(
      tournaments.map(t => ({
        updateOne: {
          filter: { externalId: t.id },
          update: { $set: mapper.mapTournament(t) },
          upsert: true
        }
      }))
    );

    console.log("Tournaments synced from ESPN");
  } catch (err) {
    console.log(err, "Unable to sync tournaments from ESPN")
  }
}

module.exports = syncTournaments;
