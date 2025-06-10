const mongoose = require("mongoose");

const footprintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object, required: true }, 
  result: { type: Object, required: true }, 
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Footprint", footprintSchema);
