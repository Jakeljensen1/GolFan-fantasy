// Backend/services/sync/golfDataGolferSync.js
const provider = require("../providers/golfDataProvider");
const mapper = require("../providers/mapper");
const Golfer = require("../../models/Golfer");

async function syncGolfDataGolfers() {
  console.log("GolfData: Syncing golfers...");

  let offset = 0;
  const limit = 50;
  let allPlayers = []; // pagination

  while (true) {
    const players = await provider.getPlayers(offset, limit);
    console.log(`GolfData: Fetched ${players.length} players at offset ${offset}`);
    if (!players.length) break;
    allPlayers = allPlayers.concat(players);
    offset += limit;
  }


  if (!allPlayers.length) {
    console.log("GolfData: No golfers returned.");
    return;
  }

  const ops = allPlayers.map((p) => ({
    updateOne: {
      filter: { externalId: p.id },
      update: { $set: mapper.mapGolfDataPlayer(p) },
      upsert: true,
    },
  }));

  await Golfer.bulkWrite(ops);
  console.log("GolfData: Golfers synced");
}

module.exports = syncGolfDataGolfers;
