const RoomModel = require("../models/room.model");

module.exports = {
  getRoom: async function (req, res) {
    try {
      const room = await RoomModel;
      res.send("room");
    } catch (e) {
      console.log(e);
    }
  },
};
