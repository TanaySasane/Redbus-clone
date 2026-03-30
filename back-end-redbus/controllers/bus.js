const Bus = require("../models/bus");

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().lean().exec();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch buses", details: err.message });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).lean().exec();
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bus", details: err.message });
  }
};
