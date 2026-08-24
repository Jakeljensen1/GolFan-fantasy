// src/controllers/lineupController.js
const Lineup = require('../models/Lineup');
const Tournament = require('../models/Tournament');

// CREATE lineup
module.exports.createLineup = async (req, res) => {
  try {
    const { tournament, golfers } = req.body;

    const lineup = await Lineup.create({
      user: req.user,
      tournament,
      golfers
    });

    res.status(201).json(lineup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET lineup by ID
module.exports.getLineup = async (req, res) => {
  try {
    const lineup = await Lineup.findById(req.params.id)
      .populate('golfers')
      .populate('tournament');

    res.json(lineup);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lineup' });
  }
};

// GET all lineups for logged-in user
module.exports.getUserLineups = async (req, res) => {
  try {
    const lineups = await Lineup.find({ user: req.user })
      .populate('golfers')
      .populate('tournament');

    res.json(lineups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user lineups' });
  }
};

// COMPUTE lineup score (lower = better)
module.exports.computeLineupScore = async (req, res) => {
  try {
    const lineup = await Lineup.findById(req.params.id);
    const tournament = await Tournament.findById(lineup.tournament);

    let totalScore = 0;

    lineup.golfers.forEach(golferId => {
      const scoreEntry = tournament.scores.find(
        s => s.golfer.toString() === golferId.toString()
      );
      if (scoreEntry && scoreEntry.totalScore !== null) {
        totalScore += scoreEntry.totalScore;
      }
    });

    lineup.totalScore = totalScore;
    await lineup.save();

    res.json({ message: 'Score computed', totalScore });
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute lineup score' });
  }
};
