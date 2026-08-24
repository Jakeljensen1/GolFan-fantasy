// src/models/Lineup.js
import mongoose from "mongoose";

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
      default: 0, // updated after scoring, reflects the actual score of the golfer, not a points system within golfan
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lineup", lineupSchema);
