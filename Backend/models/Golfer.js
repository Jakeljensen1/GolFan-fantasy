const mongoose = require('mongoose');

const golferSchema = new mongoose.Schema(
  {
    externalId: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String
    },
    worldRanking: {
      type: Number,
      default: null,
    },
    imageUrl: {
      type: String
    },
    active: {
      type: Boolean
    },
    tours: {
      type: [String], // ["PGA", "DPWT"]
      default: []
    }
  }, { timestamps: true }
);

module.exports = mongoose.model("Golfer", golferSchema);
