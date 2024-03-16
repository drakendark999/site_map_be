const SeatModel = require("../models/seat.model");
const UserModel = require("../models/user.model");
const { Sequelize } = require("sequelize");
const { param } = require("../routes/seat");
module.exports = {
  getSeat: async function (req, res) {
    try {
      const seat = await SeatModel;
      res.send("seat");
    } catch (e) {
      console.log(e);
    }
  },

  getSeatSmallRoomFloor7: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 4,
        },
      });
      return res.send({ status: 1, data_small_room: seat });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },

  getSeatFloor7: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 3,
        },
      });

      if (seat.length > 0) {
        let four_seat_first = seat.slice(0, 4);
        let seat_center = seat.slice(4, -2);
        let two_seat_last = seat.slice(-2);

        let result = [];
        const chunkSize = 5;

        for (let i = 0; i < seat_center.length; i += chunkSize) {
          result.push(seat_center.slice(i, i + chunkSize));
        }

        console.log(result.length);

        return res.send({
          status: 1,
          four_seat_first: four_seat_first,
          center_seat_1: result[0],
          center_seat_2: result[1],
          center_seat_3: result[2],
          center_seat_4: result[3],
          center_seat_5: result[4],
          center_seat_6: result[5],
          two_seat_last: two_seat_last,
        });
      }

      return res.send({
        status: 0,
        message: "Failed!",
      });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },

  getSeatSmallRoomFloor8: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 8,
        },
      });
      return res.send({ status: 1, data_small_room: seat });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },

  getSeatFloor8: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 7,
        },
      });

      if (seat.length > 0) {
        let seven_seat_first = seat.slice(0, 7);
        let seat_center = seat.slice(7, -2);
        let two_seat_last = seat.slice(-2);

        let result = [];
        const chunkSize = 5;

        for (let i = 0; i < seat_center.length; i += chunkSize) {
          result.push(seat_center.slice(i, i + chunkSize));
        }

        console.log(result.length);

        return res.send({
          status: 1,
          seven_seat_first: seven_seat_first,
          center_seat_1: result[0],
          center_seat_2: result[1],
          center_seat_3: result[2],
          two_seat_last: two_seat_last,
        });
      }

      return res.send({
        status: 0,
        message: "Failed!",
      });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
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
      console.log("result", resultChunks);

      console.log(finalResult);

      return res.send({
        status: 1,
        data_room_9_1: finalResult[0],
        data_room_9_2: finalResult[1],
        data_room_9_3: finalResult[2],
      });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },

  SeatChange: async function (req, res) {
    try {
      const params = req.body;
      const id = req.params.id;

      if (!params.idUser) {
        // params = {
        //   nameUser:'',
        //   title:'',
        //   avatar:'',
        //   phone:'
        //   idUser:''
        // }
        await UserModel.create(params);
        return res.send({ status: 1, message: "Upload Successfull" });
      } else {
        const find_old_nv = await UserModel.findOne({ where: { idSeat: id } });

        if (find_old_nv) {
          await UserModel.update({ idSeat: null }, { where: { idSeat: id } });
        }

        const find_nv = await UserModel.findOne({
          where: {
            msnv: params.msnv,
          },
        });

        if (!find_nv) {
          const data_update = await UserModel.create({
            idSeat: id,
            nameUser: params.nameUser,
            msnv: params.msnv,
            title: params.title,
            avatar: params.avatar,
            phone: params.phone,
          });
          await UserModel.update(
            { idSeat: id },
            {
              where: {
                msnv: params.msnv,
              },
            }
          );
          return res.send({
            status: 1,
            message: "Upload Successfull",
            data: data_update,
          });
        } else {
          const data_update = await UserModel.create(params);
          return res.send({
            status: 1,
            message: "Upload Successfull",
            data: data_update,
          });
        }
      }
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },
};
