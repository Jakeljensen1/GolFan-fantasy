const Lineup = require("../models/Lineup");
const TournamentEntry = require("../models/TournamentEntry");
const TournamentResult = require("../models/TournamentResult");

exports.computeLineupScore = async (req, res) => {
  try {
    const lineup = await Lineup.findById(req.params.id);

    if (!lineup) {
      return res.status(404).json({ error: "Lineup not found" });
    }

    // Extract golfer IDs from lineup.golfers
    const golferIds = lineup.golfers.map(g => g._id);

    // Load results for these golfers
    const results = await TournamentResult.find({
      tournamentId: lineup.tournament,
      golferId: { $in: golferIds }
    });

    // Compute total score using totalToPar
    let totalScore = 0;

    for (const result of results) {
      if (result.totalToPar !== null && result.totalToPar !== undefined) {
        totalScore += result.totalToPar;
      }
    }

    lineup.totalScore = totalScore;
    await lineup.save();

    res.json({ message: "Score computed", totalScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute lineup score" });
  }
};




