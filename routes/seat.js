const express = require("express");
const SeatRouter = express.Router();
const SeatController = require("../controller/seat.controller");

/* GET users listing. */
SeatRouter.get("/", SeatController.getSeat);
SeatRouter.get('/floor9',SeatController.getSeatFloor9)

module.exports = SeatRouter;
