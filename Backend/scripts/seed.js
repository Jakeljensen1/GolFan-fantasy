require("dotenv").config();
const mongoose = require("mongoose");

const seedGolfers = require("./seedGolfers");
const seedTournaments = require("./seedTournaments");
const seedTournamentEntries = require("./seedTournamentEntries");

async function runSeed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGODB_PW}@golfan.ahkl3nj.mongodb.net/?appName=golfan`);
    console.log("Connected to MongoDB");

    await seedGolfers();
    await seedTournaments();
    await seedTournamentEntries();

    console.log("✔ All seeds completed");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

runSeed();


