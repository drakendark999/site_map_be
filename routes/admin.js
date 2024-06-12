const express = require("express");
const AdminRouter = express.Router();
const AdminController = require("../controller/admin.controller");

/* GET users listing. */
AdminRouter.get("/listing", AdminController.getUser);
AdminRouter.post("/create", AdminController.createNewUser);
AdminRouter.post("/delete", AdminController.deleteUser);
AdminRouter.put("/update", AdminController.updateUser);

module.exports = AdminRouter;
