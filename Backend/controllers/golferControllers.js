// This should be a user read only controller, since golfers should already be in db and user should not have authorization to add/delete/update a golfer

const Golfer = require('../models/Golfer');

// GET all golfers
module.exports.getAllGolfers = async (req, res) => {
  try {
    const golfers = await Golfer.find();
    res.json(golfers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch golfers' });
  }
};

// GET single golfer
module.exports.getGolferById = async (req, res) => {
  try {
    const golfer = await Golfer.findById(req.params.id);
    res.json(golfer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch golfer' });
  }
};
