const SeatModel = require("../models/seat.model");

module.exports = {
  getSeat: async function (req, res) {
    try {
      const seat = await SeatModel;
      res.send('seat')
    } catch (e) {
      console.log(e);
    }
  },

  
};
