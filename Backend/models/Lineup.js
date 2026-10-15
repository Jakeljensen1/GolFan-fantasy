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

    golfers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Golfer",
        required: true,
      },
    ],

    totalScore: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lineup", lineupSchema);

