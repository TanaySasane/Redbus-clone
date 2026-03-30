const BusServices = require("../models/busservice");

module.exports.getBusService = async (req, res) => {
  try {
    const getData = await BusServices.find({});
    res.status(200).json({ data: getData });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bus services", details: err.message });
  }
};

module.exports.postBusDetails = async (req, res) => {
  try {
    const postData = await BusServices.create(req.body);
    res.status(201).json({ data: postData });
  } catch (err) {
    res.status(500).json({ error: "Failed to create bus service", details: err.message });
  }
};

module.exports.deleteBusDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const dataObj = await BusServices.findByIdAndDelete(id);
    if (!dataObj) return res.status(404).json({ error: "Bus service not found" });
    res.status(200).json({ data: dataObj });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete bus service", details: err.message });
  }
};

module.exports.eachBusDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const dataObj = await BusServices.findById(id);
    if (!dataObj) return res.status(404).json({ error: "Bus service not found" });
    res.status(200).json(dataObj);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bus service", details: err.message });
  }
};
