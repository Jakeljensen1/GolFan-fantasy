
const mongoose = require('mongoose');

const lineupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    entries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentEntry",
        required: true,
      },
    ],
    totalScore: {
      type: Number,
      default: null, // updated after scoring, reflects the actual score of the golfer, not a points system within golfan
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Lineup", lineupSchema);
