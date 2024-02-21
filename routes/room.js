const express = require("express");
const RoomRouter = express.Router();
const RoomController = require("../controller/room.controller");

/* GET users listing. */
RoomRouter.get("/", RoomController.getRoom);

module.exports = RoomRouter;
