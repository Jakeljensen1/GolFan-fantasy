
const provider = require("../providers/golfDataProvider");
const mapper = require("../providers/mapper");
const TournamentEntry = require("../../models/TournamentEntry");
const Golfer = require("../../models/Golfer");

function extractGolferId(f) {
  return f.golferId || f.playerId || f.id || null;
}

async function syncGolfDataTournamentEntries(tournament) {
  if (tournament.status !== "Scheduled") return;

  const field = await provider.getTournamentField(tournament.externalId);

  //console.log("FIELD TYPE:", typeof field, "IS ARRAY:", Array.isArray(field));
  //console.log("FIELD VALUE:", field);

  if (!field || !field.length) {
    console.log(`GolfData: No field for ${tournament.name}`);
    return;
  }

  const ops = [];

  for (const f of field) {
    const golferId = extractGolferId(f);
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
          $set: mapper.mapGolfDataTournamentEntry(f, tournament._id, golfer._id),
        },
        upsert: true,
      },
    });
  }

  if (ops.length > 0) {
    await TournamentEntry.bulkWrite(ops);
  }

  console.log(`GolfData: Tournament entries synced for ${tournament.name}`);
}

module.exports = syncGolfDataTournamentEntries;
