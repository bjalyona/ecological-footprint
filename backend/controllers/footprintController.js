const Footprint = require("../models/Footprint");

exports.saveFootprint = async (req, res) => {
  const { data, result } = req.body;
  const record = await Footprint.create({ userId: req.userId, data, result });
  res.status(201).json(record);
};

exports.getHistory = async (req, res) => {
  const records = await Footprint.find({ userId: req.userId }).sort({ date: -1 });
  res.json(records);
};
