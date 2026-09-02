const Golfer = require("../models/Golfer");

const golfers = [
  {
    externalId: "pga-101",
    name: "Scottie Scheffler",
    firstName: "Scottie",
    lastName: "Scheffler",
    country: "USA",
    countryCode: "USA",
    worldRanking: 1,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/scheffler.png"
  },
  {
    externalId: "pga-102",
    name: "Rory McIlroy",
    firstName: "Rory",
    lastName: "McIlroy",
    country: "Northern Ireland",
    countryCode: "NIR",
    worldRanking: 2,
    active: true,
    tours: ["PGA", "DPWT"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/mcilroy.png"
  },
  {
    externalId: "pga-103",
    name: "Jon Rahm",
    firstName: "Jon",
    lastName: "Rahm",
    country: "Spain",
    countryCode: "ESP",
    worldRanking: 3,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/rahm.png"
  },
  {
    externalId: "pga-104",
    name: "Xander Schauffele",
    firstName: "Xander",
    lastName: "Schauffele",
    country: "USA",
    countryCode: "USA",
    worldRanking: 4,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/schauffele.png"
  },
  {
    externalId: "pga-105",
    name: "Viktor Hovland",
    firstName: "Viktor",
    lastName: "Hovland",
    country: "Norway",
    countryCode: "NOR",
    worldRanking: 5,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/hovland.png"
  },
  {
    externalId: "pga-106",
    name: "Collin Morikawa",
    firstName: "Collin",
    lastName: "Morikawa",
    country: "USA",
    countryCode: "USA",
    worldRanking: 6,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/morikawa.png"
  },
  {
    externalId: "pga-107",
    name: "Ludvig Åberg",
    firstName: "Ludvig",
    lastName: "Åberg",
    country: "Sweden",
    countryCode: "SWE",
    worldRanking: 7,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/aberg.png"
  },
  {
    externalId: "pga-108",
    name: "Max Homa",
    firstName: "Max",
    lastName: "Homa",
    country: "USA",
    countryCode: "USA",
    worldRanking: 8,
    active: true,
    tours: ["PGA"],
    imageUrl: "https://pga-tour-headshots.s3.amazonaws.com/homa.png"
  }
];

async function seedGolfers() {
  await Golfer.bulkWrite(
    golfers.map(g => ({
      updateOne: {
        filter: { externalId: g.externalId },
        update: { $set: g },
        upsert: true
      }
    }))
  );

  console.log("✔ Golfers seeded");
}

module.exports = seedGolfers;
