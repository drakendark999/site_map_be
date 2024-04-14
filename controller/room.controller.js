const RoomModel = require("../models/room.model");

module.exports = {
  getRoom: async function (req, res) {
    try {
      const room = await RoomModel.findAll();
      res.send({status:1,data:room});
    } catch (e) {
      console.log(e);
    }
  },
};
