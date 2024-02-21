const express = require("express");
const FloorRouter = express.Router();
const FLoorController = require("../controller/floor.controller");

/* GET users listing. */
FloorRouter.get("/", FLoorController.getFloor);

module.exports = FloorRouter;
