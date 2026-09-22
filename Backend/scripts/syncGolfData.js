require("dotenv").config();
const mongoose = require("mongoose");

const golferSync = require("../services/syncGolfData/golfDataGolferSync");
const tournamentSync = require("../services/syncGolfData/golfDataTournamentSync");
const syncTournamentEntries = require("../services/syncGolfData/golfDataTournamentEntrySync");
const syncTournamentResults = require("../services/syncGolfData/golfDataTournamentResultSync");

const Tournament = require("../models/Tournament");

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGODB_PW}@golfan.ahkl3nj.mongodb.net/?appName=golfan`
    );
    console.log("Connected to MongoDB");

    console.log("GolfData: Syncing golfers...");
    await golferSync();

    console.log("GolfData: Syncing tournaments...");
    await tournamentSync();

    const tournaments = await Tournament.find({});
    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);

    console.log("GolfData: Syncing tournament entries...");
    for (const t of tournaments) {
      const start = new Date(t.startDate);
      if (t.status === "Upcoming" && start <= oneWeekAhead) {
        await syncTournamentEntries(t);
      }
    }

    console.log("GolfData: Syncing tournament results...");
    for (const t of tournaments) {
      if (["Completed", "InProgress"].includes(t.status)) {
        await syncTournamentResults(t);
      }
    }

    console.log("✔ GolfData sync complete");
    process.exit(0);
  } catch (err) {
    console.error("GolfData sync error:", err);
    process.exit(1);
  }
})();

