const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/user.controller");

/* GET users listing. */
UserRouter.get("/", UserController.getUser);

module.exports = UserRouter;
