// scripts/sync.js
require("dotenv").config();
const mongoose = require("mongoose");

const golferSync = require("../services/sync/golferSync");
const tournamentSync = require("../services/sync/tournamentSync");
const syncTournamentEntries = require("../services/sync/tournamentEntry");
const syncTournamentResults = require("../services/sync/tournamentResultSync");
const Tournament = require("../models/Tournament");

(async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGODB_PW}@golfan.ahkl3nj.mongodb.net/?appName=golfan`);

    console.log("Syncing golfers...");
    await golferSync();

    console.log("Syncing tournaments...");
    await tournamentSync();

    console.log("Syncing tournament entries...");
    const tournaments = await Tournament.find({});
    for (const t of tournaments) {
      await syncTournamentEntries(t);
    }

    console.log("Syncing tournament results (completed only)...");
    for (const t of tournaments) {
      if (t.status === "completed") {
        await syncTournamentResults(t);
      }
    }

    console.log("✔ Sync complete");
    process.exit(0);
  } catch (err) {
    console.error("Sync error:", err);
    process.exit(1);
  }
})();



