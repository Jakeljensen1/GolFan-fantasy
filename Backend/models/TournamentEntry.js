const mongoose = require('mongoose');

const tournamentEntrySchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament"
  },
  golferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Golfer"
  },
  status: String,           // active, withdrawn, cut, dq
  teeTime: Date,
  position: Number,
  round: Number,
  score: Number,             // score for current round
  totalToPar: Number,        // -5, +2, etc.
  madeCut: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("TournamentEntry", tournamentEntrySchema);
