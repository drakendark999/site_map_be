const express = require("express");
const SeatRouter = express.Router();
const SeatController = require("../controller/seat.controller");

/* GET users listing. */
SeatRouter.get("/", SeatController.getSeat);
// get seat big room floor 9
SeatRouter.get("/floor9", SeatController.getSeatFloor9);
// get seat big room floor 7
SeatRouter.get("/floor7", SeatController.getSeatFloor7);
// Edit Seat
SeatRouter.post("/seat-change/:id", SeatController.SeatChange); // id : idSeat
// params = {
//   nameUser:'',
//   msnv:'',
//   title:'',
//   avatar:'',
//   idUser:''
// }

module.exports = SeatRouter;
