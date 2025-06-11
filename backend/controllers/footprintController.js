const Footprint = require("../models/Footprint");

exports.saveFootprint = async (req, res) => {
  const { data, result } = req.body;
  const bb = result.breakdownByCategory;
  if (
    typeof bb.Food !== "number" ||
    typeof bb.Transport !== "number" ||
    typeof bb["Energy & Housing"] !== "number" ||
    typeof bb.Consumption !== "number" ||
    typeof bb.Digital !== "number"
  ) {
    return res.status(400).json(error);
  }

  const record = await Footprint.create({
    userId: req.userId,
    data,
    result,
  });

  res.status(201).json(record);
};

exports.getHistory = async (req, res) => {
  const records = await Footprint.find({ userId: req.userId })
    .sort({ date: -1 })
    .lean();

  res.json(records.map(r => ({
    id: r._id,
    createdAt: r.date,
    co2KgPerYear: r.result.co2KgPerYear,
    gha: r.result.gha,
    planets: r.result.planets,
    breakdownByCategory: r.result.breakdownByCategory,
    data: r.data,
  })));
};
