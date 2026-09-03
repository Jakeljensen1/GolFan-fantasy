const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema(
  {
    externalId: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    tour: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    location: {
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
    status: {
      type: String, // "upcoming", "in_progress", "completed"
    },
    purse: {
      type: Number
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
