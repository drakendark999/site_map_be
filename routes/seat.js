const express = require("express");
const SeatRouter = express.Router();
const SeatController = require("../controller/seat.controller");

/* GET users listing. */
SeatRouter.get("/", SeatController.getSeat);
SeatRouter.get('/floor9',SeatController.getSeatFloor9)

// Edit Seat
SeatRouter.post('/seat-change/:id',SeatController.SeatChange)  // id : idSeat
     // params = {
        //   nameUser:'',
        //   title:'',
        //   avatar:'',
        //   idSeat:''
        // }

module.exports = SeatRouter;
