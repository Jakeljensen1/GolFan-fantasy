const Tournament = require("../models/Tournament");
const Golfer = require("../models/Golfer");
const TournamentEntry = require("../models/TournamentEntry");

async function seedTournamentEntries() {
  console.log("Seeding tournament entries...");

  const masters = await Tournament.findOne({ externalId: "tourn-001" });

  if (!masters) {
    throw new Error("Masters tournament not found. Did seedTournaments run?");
  }

  const golfers = await Golfer.find({
    externalId: { $in: ["pga-101", "pga-102", "pga-103", "pga-104", "pga-105", "pga-106", "pga-107", "pga-108"] }
  });

  const entries = golfers.map(g => ({
    updateOne: {
      filter: { tournamentId: masters._id, golferId: g._id },
      update: {
        $set: {
          tournamentId: masters._id,
          golferId: g._id,
          status: "active",
          teeTime: null,
          position: null,
          round: 0,
          score: null,
          totalToPar: null,
          madeCut: false
        }
      },
      upsert: true
    }
  }));

  await TournamentEntry.bulkWrite(entries);

  console.log("✔ Tournament entries seeded");
}

module.exports = seedTournamentEntries;
