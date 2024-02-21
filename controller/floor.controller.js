const FloorModel = require("../models/floor.model");

module.exports = {
getFloor: async function (req, res) {
    try {
      const floor = await FloorModel;
      res.send("floor");
    } catch (e) {
      console.log(e);
    }
  },
};
