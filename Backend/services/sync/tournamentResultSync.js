const axios = require("axios");
const provider = require("../providers/espnProvider");
const mapper = require("../providers/mapper");
const TournamentResult = require("../../models/TournamentResult");
const Golfer = require("../../models/Golfer");

async function syncTournamentResults(tournament) {
  const eventId = tournament.externalId;
  const competitionId = eventId; // ESPN uses same ID for PGA competitions

  let leaderboard;
  try {
    leaderboard = await provider.getLeaderboard(eventId, competitionId);
  } catch (err) {
    console.error(`Unable to fetch leaderboard for ${tournament.name}`);
    return;
  }

  const leaders = leaderboard.leaders ?? [];
  if (leaders.length === 0) {
    console.log(`No leaderboard data for ${tournament.name}`);
    return;
  }

  const ops = [];

  for (const leader of leaders) {
    const golfer = await Golfer.findOne({ externalId: leader.athlete.id });
    if (!golfer) continue;

    ops.push({
      updateOne: {
        filter: {
          tournamentId: tournament._id,
          golferId: golfer._id
        },
        update: {
          $set: mapper.mapTournamentResult(leader, tournament._id, golfer._id)
        },
        upsert: true
      }
    });
  }

  if (ops.length > 0) {
    await TournamentResult.bulkWrite(ops);
  }

  console.log(`✔ Tournament results synced for ${tournament.name}`);
}

module.exports = syncTournamentResults;

