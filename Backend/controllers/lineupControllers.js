const Lineup = require('../models/Lineup');
const Tournament = require('../models/Tournament');
const validateLineup = require("../utils/validateLineup");

// CREATE lineup

exports.createLineup = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body)
    const { tournamentId, entryIds } = req.body;
    const userId = req.user;

    await validateLineup({ userId, tournamentId, entryIds });

    const lineup = await Lineup.create({
      user: userId,
      tournament: tournamentId,
      entries: entryIds
    });

    res.status(201).json(lineup);
  } catch (err) {
    //console.error("LINEUP CREATE ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};


// GET lineup by ID
module.exports.getLineup = async (req, res) => {
  try {
    const lineup = await Lineup.findOne({
      _id: req.params.id,
      user: req.user
    })
      .populate({
        path: "entries",
        populate: { path: "golferId" }
      })
      .populate('tournament');

    if (!lineup) return res.status(404).json({ error: "Lineup not found" })

    res.json(lineup);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lineup' });
  }
};

// GET all lineups for logged-in user
module.exports.getUserLineups = async (req, res) => {
  try {
    const lineups = await Lineup.find({ user: req.user })
      .populate('tournament')
      .populate({
        path: "entries",
        populate: { path: "golferId" }
      });

    res.json(lineups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user lineups' });
  }
};

// GET all lineups for a tournament
module.exports.getTournamentLineups = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const lineups = await Lineup.find({ tournament: tournamentId })
      .populate('user')
      .populate({
        path: "entries",
        populate: { path: "golferId" }
      })
      .populate('tournament');

    //sort
    lineups.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    res.json(lineups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tournament lineups' });
  }
};



