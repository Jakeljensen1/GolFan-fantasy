const Tournament = require('../models/Tournament');

// GET all tournaments
module.exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('golfers');
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tournaments' });
  }
};

// GET tournament by ID
module.exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('golfers');

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tournament' });
  }
};

// get golfers for a specific tournament
module.exports.getTournamentGolfers = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('golfers');

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json(tournament.golfers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load tournament golfers' });
  }
};
