const express = require("express");
const router = express.Router();
const busController = require("../controllers/bus");

router.get("/v1/api/buses", busController.getAllBuses);
router.get("/v1/api/buses/:id", busController.getBusById);

module.exports = router;
