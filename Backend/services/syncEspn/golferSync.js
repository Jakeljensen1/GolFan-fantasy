const Golfer = require("../../models/Golfer");
const provider = require("../providers/espnProvider");
const mapper = require("../providers/mapper");
const axios = require('axios')

async function syncGolfers() {
  try {
    const items = await provider.getPlayers(); // list of $ref URLs since this is what ESPN returns to us

    const players = [];
    for (const item of items) {
      const full = await axios.get(item.$ref);
      players.push(full.data);
    }

    await Golfer.bulkWrite(
      players.map(p => ({
        updateOne: {
          filter: { externalId: p.id },
          update: { $set: mapper.mapPlayer(p) },
          upsert: true
        }
      }))
    );
    console.log("Golfers synced");

  } catch (err) {
    console.log(err, "Unable to sync golfers from ESPN");
  }
}

module.exports = syncGolfers;
