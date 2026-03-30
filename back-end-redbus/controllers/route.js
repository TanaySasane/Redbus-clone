const Route = require("../models/route");
const Bus = require("../models/bus");
const Booking = require("../models/boooking");

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().lean().exec();
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes", details: err.message });
  }
};

// get route, buses and available seats based on departure/arrival/date
exports.getOneRoute = async (req, res) => {
  try {
    const { departure, arrival, date } = req.params;

    const routes = await Route.find().lean().exec();
    const route = routes.find(
      (r) =>
        r.departureLocation.name.toLowerCase() === departure.toLowerCase() &&
        r.arrivalLocation.name.toLowerCase() === arrival.toLowerCase()
    );

    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    const buses = await Bus.find();
    const matchedBuses = buses.filter(
      (bus) => bus.routes.toString() === route._id.toString()
    );

    const bookings = await Booking.find().lean().exec();
    const busIdWithSeatsObj = {};
    for (let i = 0; i < matchedBuses.length; i++) {
      let currentBusSeats = [];
      const busBookings = bookings.filter(
        (booking) =>
          booking.departureDetails.date === date &&
          booking.busId.toString() === matchedBuses[i]._id.toString()
      );
      busBookings.forEach((booking) => {
        currentBusSeats = [...currentBusSeats, ...booking.seats];
      });
      busIdWithSeatsObj[matchedBuses[i]._id.toString()] = currentBusSeats;
    }

    res.status(200).json({ route, matchedBuses, busIdWithSeatsObj });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch route data", details: err.message });
  }
};
