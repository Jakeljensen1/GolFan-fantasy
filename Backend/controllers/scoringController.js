const Lineup = require("../models/Lineup");
const TournamentResult = require("../models/TournamentResult");

exports.computeLineupScore = async (req, res) => {
  try {
    const lineup = await Lineup.findById(req.params.id);

    if (!lineup) return res.status(404).json({ error: "Lineup not found" });

    const results = await TournamentResult.find({
      tournamentId: lineup.tournament,
      golferId: { $in: lineup.entries.map(e => e.golferId) }
    });

    let totalScore = 0;

    for (const result of results) {
      if (result.totalScore !== null) {
        totalScore += result.totalScore;
      }
    }

    lineup.totalScore = totalScore;
    await lineup.save();

    res.json({ message: "Score computed", totalScore });
  } catch (err) {
    res.status(500).json({ error: "Failed to compute lineup score" });
  }
};
