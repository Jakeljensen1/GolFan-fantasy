const axios = require("axios");
const provider = require("../providers/espnProvider");
const mapper = require("../providers/mapper");
const TournamentEntry = require("../../models/TournamentEntry");
const Golfer = require("../../models/Golfer");

function getCompetitorId(c) {
  if (c.id) return c.id;

  const ref = c.athlete?.$ref;
  if (!ref) return null;

  const parts = ref.split("/");
  return parts[parts.length - 1];
}

async function syncTournamentEntries(tournament) {
  let items;

  try {
    items = await provider.getTournamentField(tournament.externalId);
  } catch (err) {
    if (err.response?.status === 404) {
      console.log(`Skipping ${tournament.name} — no competitor data available.`);
      return;
    }
    console.error(`Error fetching competitors for ${tournament.name}`, err);
    return;
  }

  if (!items || items.length === 0) {
    console.log(`Skipping ${tournament.name} — competitor list empty.`);
    return;
  }

  const competitors = [];
  for (const item of items) {
    const full = await axios.get(item.$ref);
    competitors.push(full.data);
  }

  const ops = [];

  for (const c of competitors) {
    const competitorId = getCompetitorId(c);
    if (!competitorId) continue;

    const golfer = await Golfer.findOne({ externalId: competitorId });
    if (!golfer) continue;

    ops.push({
      updateOne: {
        filter: {
          tournamentId: tournament._id,
          golferId: golfer._id
        },
        update: {
          $set: mapper.mapTournamentEntry(c, tournament._id, golfer._id)
        },
        upsert: true
      }
    });
  }

  if (ops.length > 0) {
    await TournamentEntry.bulkWrite(ops);
  }

  console.log(`Tournament entries synced for ${tournament.name}`);
}

module.exports = syncTournamentEntries;

