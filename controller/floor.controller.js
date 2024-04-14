const { Op } = require("sequelize");
const FloorModel = require("../models/floor.model");
const RoomModel = require("../models/room.model");

module.exports = {
  getFloor: async function (req, res) {
    try {
      const idsToExclude = [5, 6, 8];
      const floor = await FloorModel.findAll({
        attributes: ["idFloor", "nameFloor"],
        where: {
          idFloor: {
            [Op.notIn]: idsToExclude,
          },
        },
        order: [["nameFloor", "ASC"]],
      });
    
      return res.send({ status: 1, data: floor });
    } catch (e) {
      console.log(e);
    }
  },
};
