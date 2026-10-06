// Backend/services/sync/golfDataTournamentResultSync.js
const provider = require("../providers/golfDataProvider");
const mapper = require("../providers/mapper");
const TournamentResult = require("../../models/TournamentResult");
const Golfer = require("../../models/Golfer");

function extractGolferId(row) {
  return (
    row.golferId ||
    row.playerId ||
    row.id ||
    row.player?.id ||
    null
  );
}

async function syncGolfDataTournamentResults(tournament) {
  // Allow all GolfData result statuses
  if (!["InProgress", "Completed", "Final", "Live", "Result"].includes(tournament.status)) {
    return;
  }

  const leaderboard = await provider.getLeaderboard(tournament.externalId);

  if (!leaderboard || leaderboard.length === 0) {
    console.log(`GolfData: No leaderboard for ${tournament.name}`);
    return;
  }

  const ops = [];

  for (const row of leaderboard) {
    const golferId = extractGolferId(row);
    if (!golferId) continue;

    const golfer = await Golfer.findOne({ externalId: golferId });
    if (!golfer) continue;

    ops.push({
      updateOne: {
        filter: {
          tournamentId: tournament._id,
          golferId: golfer._id,
        },
        update: {
          $set: mapper.mapGolfDataTournamentResult(
            row,
            tournament._id,
            golfer._id
          ),
        },
        upsert: true,
      },
    });
  }

  if (ops.length > 0) {
    await TournamentResult.bulkWrite(ops);
    console.log(`GolfData: Synced ${ops.length} results for ${tournament.name}`);
  }
}

module.exports = syncGolfDataTournamentResults;

