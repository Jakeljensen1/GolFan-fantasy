const Lineup = require('../models/Lineup');
const Tournament = require('../models/Tournament');
const TournamentResult = require("../models/TournamentResult");
const validateLineup = require("../utils/validateLineup");

// CREATE lineup
exports.createLineup = async (req, res) => {
  try {
    const { tournamentId, golferIds } = req.body;
    const userId = req.user;

    await validateLineup({ userId, tournamentId, golferIds });

    const lineup = await Lineup.create({
      user: userId,
      tournament: tournamentId,
      golfers: golferIds
    });

    res.status(201).json(lineup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET lineup by ID
exports.getLineup = async (req, res) => {
  try {
    const lineup = await Lineup.findOne({
      _id: req.params.id,
      user: req.user
    })
      .populate("golfers")
      .populate("tournament");

    if (!lineup) return res.status(404).json({ error: "Lineup not found" });

    res.json(lineup);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lineup" });
  }
};

// GET all lineups for logged-in user
exports.getUserLineups = async (req, res) => {
  try {
    const lineups = await Lineup.find({ user: req.user })
      .populate("tournament")
      .populate("golfers");

    res.json(lineups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user lineups" });
  }
};

// GET all lineups for a tournament
exports.getTournamentLineups = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const lineups = await Lineup.find({ tournament: tournamentId })
      .populate("user")
      .populate("golfers")
      .populate("tournament");

    // Sort by totalScore (lower is better)
    lineups.sort((a, b) => (a.totalScore ?? 9999) - (b.totalScore ?? 9999));

    res.json(lineups);
  } catch (err) {
    console.error("TOURNAMENT LINEUPS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch tournament lineups" });
  }
};

// GET fantasy leaderboard for a tournament
exports.getFantasyLeaderboard = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    const lineups = await Lineup.find({ tournament: tournamentId })
      .populate("user")
      .populate("golfers")
      .populate("tournament")
      .sort({ totalScore: 1 }); // lower score = better

    const results = await TournamentResult.find({
      tournamentId
    }).populate("golferId");

    res.json({
      tournament,
      fantasyLeaderboard: lineups,
      tournamentResults: results
    });

  } catch (err) {
    console.error("LEADERBOARD ERROR:", err);
    res.status(500).json({ error: "Failed to load fantasy leaderboard" });
  }
};




