const mongoose = require("mongoose");

const footprintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object, required: true },
  result: {
    co2KgPerYear: { type: Number, required: true },
    gha: { type: Number, required: true },
    planets: { type: Number, required: true },
    breakdownByCategory: {
      Food: { type: Number, required: true },
      Transport: { type: Number, required: true },
      "Energy & Housing": { type: Number, required: true },
      Consumption: { type: Number, required: true },
      Digital: { type: Number, required: true },
    }
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Footprint", footprintSchema);
