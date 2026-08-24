// src/models/Golfer.js
import mongoose from "mongoose";

const golferSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pgaId: { // Help us with data later
      type: Number,
      required: true,
      unique: true,
    },
    worldRanking: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Golfer", golferSchema);
