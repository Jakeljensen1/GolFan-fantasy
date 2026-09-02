const Lineup = require("../models/Lineup");
const Tournament = require("../models/Tournament");
const TournamentEntry = require("../models/TournamentEntry");

async function validateLineup({ userId, tournamentId, entryIds }) {
  // 1. Must select exactly 4 golfers
  if (entryIds.length !== 4) {
    throw new Error("A lineup must contain exactly 4 golfers.");
  }

  // 2. No duplicates
  const unique = new Set(entryIds);
  if (unique.size !== entryIds.length) {
    throw new Error("Duplicate golfers are not allowed.");
  }

  // 3. Tournament must exist
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found.");
  }

  // 4. Cannot submit after tournament start
  const now = new Date();
  if (now >= tournament.startDate) {
    throw new Error("Lineups cannot be submitted after the tournament starts.");
  }

  // 5. Only one lineup per user per tournament
  const existing = await Lineup.findOne({ user: userId, tournament: tournamentId });
  if (existing) {
    throw new Error("You have already submitted a lineup for this tournament.");
  }

  // 6. Validate each TournamentEntry
  const entries = await TournamentEntry.find({
    _id: { $in: entryIds },
    tournamentId: tournamentId,
  });

  if (entries.length !== entryIds.length) {
    throw new Error("One or more selected golfers are not in this tournament.");
  }

  // 7. Cannot select withdrawn golfers
  for (const entry of entries) {
    if (entry.status === "withdrawn") {
      throw new Error(`Golfer ${entry.golferId} has withdrawn and cannot be selected.`);
    }
  }

  // 8. Alternates allowed only before start
  // (If you track alternates via entry.status === "alternate")
  for (const entry of entries) {
    if (entry.status === "alternate" && now >= tournament.startDate) {
      throw new Error("Alternates cannot be selected after the tournament starts.");
    }
  }

  return true;
}

module.exports = validateLineup;
