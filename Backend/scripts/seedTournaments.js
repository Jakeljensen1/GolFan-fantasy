const Tournament = require("../models/Tournament");

const tournaments = [
  {
    externalId: "tourn-001",
    name: "The Masters",
    tour: "PGA",
    course: "Augusta National Golf Club",
    location: "Augusta, GA",
    startDate: new Date("2025-04-10"),
    endDate: new Date("2025-04-13"),
    status: "upcoming",
    purse: 20000000,
    season: 2025
  }
];

async function seedTournaments() {
  await Tournament.bulkWrite(
    tournaments.map(t => ({
      updateOne: {
        filter: { externalId: t.externalId },
        update: { $set: t },
        upsert: true
      }
    }))
  );

  console.log("✔ Tournaments seeded");
}

module.exports = seedTournaments;

