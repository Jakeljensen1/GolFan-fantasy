// Backend/services/sync/golfDataTournamentSync.js
const provider = require("../providers/golfDataProvider");
const mapper = require("../providers/mapper");
const Tournament = require("../../models/Tournament");

async function syncGolfDataTournaments() {
  console.log("GolfData: Syncing tournaments...");

  const tournaments = await provider.getTournaments();
  if (!tournaments.length) {
    console.log("GolfData: No tournaments returned.");
    return;
  }

  //To not overcrowd the DB, only show results from 1 month ago, tournaments in the next month
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);
  const oneMonthAhead = new Date(now);
  oneMonthAhead.setMonth(now.getMonth() + 1);

  const filtered = tournaments.filter((t) => {
    const start = new Date(t.startDate);
    return start >= oneMonthAgo && start <= oneMonthAhead;
  });

  const ops = filtered.map((t) => ({
    updateOne: {
      filter: { externalId: t.id },
      update: { $set: mapper.mapGolfDataTournament(t) },
      upsert: true,
    },
  }));

  await Tournament.bulkWrite(ops);
  console.log("GolfData: Tournaments synced");
}

module.exports = syncGolfDataTournaments;
