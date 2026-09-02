const Tournament = require('../models/Tournament');
const TournamentEntry = require("../models/TournamentEntry");
const TournamentResult = require("../models/TournamentResult");

// GET all tournaments
exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ startDate: 1 });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
};

// GET tournament by ID
exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ error: "Tournament not found" });

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tournament" });
  }
};

// GET tournament field (TournamentEntry)
exports.getTournamentField = async (req, res) => {
  try {
    const entries = await TournamentEntry.find({
      tournamentId: req.params.id
    }).populate("golferId");

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tournament field" });
  }
};

// GET tournament results (final standings)
exports.getTournamentResults = async (req, res) => {
  try {
    const results = await TournamentResult.find({
      tournamentId: req.params.id
    }).populate("golferId");

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tournament results" });
  }
};