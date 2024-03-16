const express = require("express");
const SeatRouter = express.Router();
const SeatController = require("../controller/seat.controller");

/* GET users listing. */
SeatRouter.get("/", SeatController.getSeat);

// get seat big room floor 7
SeatRouter.get("/floor7", SeatController.getSeatFloor7);
SeatRouter.get("/floor7-small-room", SeatController.getSeatSmallRoomFloor7);
// get seat big room floor 8
SeatRouter.get("/floor8", SeatController.getSeatFloor8);
SeatRouter.get("/floor8-small-room", SeatController.getSeatSmallRoomFloor8);
// get seat big room floor 9
SeatRouter.get("/floor9", SeatController.getSeatFloor9);
// get seat big room floor 10
SeatRouter.get("/floor10", SeatController.getSeatFloor10);
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
