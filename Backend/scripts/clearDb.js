require("dotenv").config();
const mongoose = require("mongoose");
const Golfer = require("../models/Golfer");
const Tournament = require("../models/Tournament");
const TournamentEntry = require("../models/TournamentEntry");
const TournamentResult = require("../models/TournamentResult");

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGODB_PW}@golfan.ahkl3nj.mongodb.net/?appName=golfan`
    );
    console.log("Connected to MongoDB");

    await Golfer.deleteMany({});
    await Tournament.deleteMany({});
    await TournamentEntry.deleteMany({});
    await TournamentResult.deleteMany({});

    console.log("✔ Cleared all collections");
    process.exit(0);
  } catch (err) {
    console.error("Clear DB error:", err);
    process.exit(1);
  }
})();
