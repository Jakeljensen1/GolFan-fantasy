// Backend/services/sync/golfDataTournamentResultSync.js
const provider = require("../providers/golfDataProvider");
const mapper = require("../providers/mapper");
const TournamentResult = require("../../models/TournamentResult");
const Golfer = require("../../models/Golfer");

async function syncGolfDataTournamentResults(tournament) {
  if (!["InProgress", "Completed"].includes(tournament.status)) return;

  const leaderboard = await provider.getLeaderboard(tournament.externalId);

  if (!leaderboard || !leaderboard.length) {
    console.log(`GolfData: No leaderboard for ${tournament.name}`);
    return;
  }

  const ops = [];

  for (const row of leaderboard) {
    const golfer = await Golfer.findOne({ externalId: row.golferId });
    if (!golfer) continue;

    ops.push({
      updateOne: {
        filter: {
          tournamentId: tournament._id,
          golferId: golfer._id,
        },
        update: {
          $set: mapper.mapGolfDataTournamentResult(row, tournament._id, golfer._id),
        },
        upsert: true,
      },
    });
  }

  if (ops.length > 0) {
    await TournamentResult.bulkWrite(ops);
  }

  console.log(`GolfData: Tournament results synced for ${tournament.name}`);
}

module.exports = syncGolfDataTournamentResults;
