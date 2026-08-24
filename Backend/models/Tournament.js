// src/models/Tournament.js
import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    golfers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Golfer",
      },
    ],
    scores: [
      {
        golfer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Golfer'
        },
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Tournament", tournamentSchema);
