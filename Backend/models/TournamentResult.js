const mongoose = require("mongoose");

const tournamentResultSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament" },
  golferId: { type: mongoose.Schema.Types.ObjectId, ref: "Golfer" },

  finalPosition: Number,
  totalScore: Number,
  totalToPar: Number,
  earnings: Number,
}, { timestamps: true });

module.exports = mongoose.model("TournamentResult", tournamentResultSchema);
