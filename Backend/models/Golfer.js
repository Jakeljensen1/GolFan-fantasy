const mongoose = require('mongoose');

const golferSchema = new mongoose.Schema(
  {
    externalId: {
      Type: String
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
    tours: [
      String // ["PGA", "DPWT"]
    ]
  }, { timestamps: true }
);

module.exports = mongoose.model("Golfer", golferSchema);
