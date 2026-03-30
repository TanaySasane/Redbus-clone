const Customer = require("../models/customer");

// Add customer if one with that email doesn't already exist
exports.addNewCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const existingCustomer = await Customer.findOne({ email }).lean().exec();
    if (existingCustomer) {
      return res.status(200).json(existingCustomer);
    }
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer", details: err.message });
  }
};
