const Booking = require("../models/boooking");

exports.addBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking", details: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find().lean().exec();
    const filteredBookings = bookings.filter(
      (booking) => booking.customerId.toString() === id
    );
    res.status(200).json(filteredBookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err.message });
  }
};
