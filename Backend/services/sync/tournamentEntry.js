const axios = require("axios");
const provider = require("../providers/espnProvider");
const mapper = require("../providers/mapper");
const TournamentEntry = require("../../models/TournamentEntry");
const Golfer = require("../../models/Golfer");

async function syncTournamentEntries(tournament) {
  const items = await provider.getTournamentField(tournament.externalId);

  const competitors = [];
  for (const item of items) {
    const full = await axios.get(item.$ref);
    competitors.push(full.data);
  }

  const ops = [];

  for (const c of competitors) {
    // ESPN competitor.id is golfer externalId
    const golfer = await Golfer.findOne({ externalId: c.id });
    if (!golfer) continue;

    ops.push({
      updateOne: {
        filter: {
          tournamentId: tournament._id,
          golferId: golfer._id
        },
        update: {
          $set: mapper.mapTournamentEntry(c, tournament._id, golfer._id)
        },
        upsert: true
      }
    });
  }

  if (ops.length > 0) {
    await TournamentEntry.bulkWrite(ops);
  }

  console.log(`Tournament entries synced for ${tournament.name}`);
}

module.exports = syncTournamentEntries;
