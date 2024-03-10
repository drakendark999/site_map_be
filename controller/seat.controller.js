const SeatModel = require("../models/seat.model");
const UserModel = require("../models/user.model");
const { Sequelize } = require("sequelize");
module.exports = {
  getSeat: async function (req, res) {
    try {
      const seat = await SeatModel;
      res.send("seat");
    } catch (e) {
      console.log(e);
    }
  },

  getSeatFloor9: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 9,
        },
      });

      const resultChunks = [];
      const chunkSize = 6;

      for (let i = 0; i < seat.length; i += chunkSize) {
        const chunk = seat.slice(i, i + chunkSize);
        resultChunks.push(chunk);
      }

      // Chia mảng con thành 3 mảng
      const finalResult = [];
      const subChunkSize = Math.ceil(resultChunks.length / 3);
      for (let i = 0; i < resultChunks.length; i += subChunkSize) {
        const subChunk = resultChunks.slice(i, i + subChunkSize);
        finalResult.push(subChunk);
      }
      console.log('result',resultChunks);

      console.log(finalResult);

      return res.send({
        status: 1,
        data_room_9_1: finalResult[0],
        data_room_9_2: finalResult[1],
        data_room_9_3: finalResult[2],
        seat:seat
      });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },
};
