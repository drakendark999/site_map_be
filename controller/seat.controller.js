const SeatModel = require("../models/seat.model");
const UserModel = require("../models/user.model");
const { uploadFile } = require("../libs/uploadImg");

module.exports = {
  getSeat: async function (req, res) {
    try {
      const seat = await SeatModel;
      res.send("seat");
    } catch (e) {
      console.log(e);
    }
  },

  getSeatFloor6: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 16,
        },
      });
      return res.send({ status: 1, data_small_room: seat });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
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
      const firstChunkSize = 7;
      const remainingChunkSize = 6;

      // Tạo mảng con đầu tiên có 7 phần tử
      const firstChunk = seat.slice(0, firstChunkSize);
      resultChunks.push(firstChunk);

      // Tạo 2 mảng con còn lại với 6 phần tử mỗi mảng
      for (let i = firstChunkSize; i < seat.length; i += remainingChunkSize) {
        const chunk = seat.slice(i, i + remainingChunkSize);
        resultChunks.push(chunk);
      }

      console.log("result", resultChunks);

      return res.send({
        status: 1,
        data_room_9_1: resultChunks[0],
        data_room_9_2: resultChunks[1],
        data_room_9_3: resultChunks[2],
      });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },

  getSeatFloor10: async function (req, res) {
    try {
      const seat = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 10,
        },
      });

      if (seat.length > 0) {
        let two_seat_first = seat.slice(0, 2);
        let three_seat = seat.slice(2, 5);
        let two_seat = seat.slice(5, 7);
        let three_seat_last = seat.slice(-3);

        return res.send({
          status: 1,
          two_seat_first: two_seat_first,
          three_seat: three_seat,
          two_seat: two_seat,
          three_seat_last: three_seat_last,
        });
      }
    } catch (e) {
      console.log(e);
      return res.send({ staus: 0, message: e });
    }
  },

  SeatChange: async function (req, res) {
    try {
      const file = req.file;
      const params = req.body;
      const id = req.params.id;

      console.log(params);

      console.log("Received file:", file);
      console.log("Received other data:", params.idUser);

      let avatar = null;

      if (file) {
        avatar = await uploadFile(file);
      }
      // console.log("avar", avatar);

      if (params.idUser == "null") {
        console.log("chua co nv ", params);
        console.log("chua co nv ", id);
        await UserModel.create({
          idSeat: id,
          nameUser: params.nameUser,
          msnv: params.msnv,
          title: params.title,
          avatar: avatar,
          phone: params.phone,
        });
        return res.send({ status: 1, message: "Upload Successfull" });
      } else {
        const find_old_nv = await UserModel.findOne({ where: { idSeat: id } });

        if (find_old_nv) {
          console.log("da xoa");
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
            avatar: avatar,
            phone: params.phone,
          });

          return res.send({
            status: 1,
            message: "Upload Successfull",
            data: data_update,
          });
        } else {
          const data_update = await UserModel.update(
            {
              idSeat: id,
              avatar: params.avatar ? params.avatar : avatar,
              nameUser: params.nameUser,
              msnv: params.msnv,
              title: params.title,
            },
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
        }
      }
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: e });
    }
  },
  SeatDelete: async function (req, res) {
    try {
      const id = req.params.id;
      const find_old_nv = await UserModel.findOne({ where: { idSeat: id } });
      if (find_old_nv) {
        await UserModel.destroy({ where: { idSeat: id } });
        return res.send({ status: 1, message: "Delete sucessfully" });
      }
      return res.send({ status: 0, message: "Delete error" });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: "Delete error" });
    }
  },
};
