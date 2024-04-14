const SeatModel = require("../models/seat.model");
const UserModel = require("../models/user.model");
const { uploadFile } = require("../libs/uploadImg");
const RoomModel = require("../models/room.model");
const { Op } = require("sequelize");

module.exports = {
  changeSeat: async (req, res) => {
    try {
      const { idOldSeat, idNewSeat } = req.body;
      if (!idOldSeat || !idNewSeat) {
        return res.send({ status: 0 });
      } else {
        find_user_id_new_seat = await UserModel.update(
          { idSeat: null },
          {
            where: {
              idSeat: idNewSeat,
            },
          }
        );
        find_user_id_old_seat = await UserModel.update(
          { idSeat: idNewSeat },
          {
            where: {
              idSeat: idOldSeat,
            },
          }
        );
        return res.send({ status: 1, message: "success" });
      }
    } catch (err) {
      console.log(err);
      return res.send({ status: 0, message: "error" });
    }
  },
  getSeatBaseOnFloor: async function (req, res) {
    try {
      const idFloor = req.params.id;
      const room = await RoomModel.findAll({
        attributes: ["idRoom"],
        where: {
          idFloor: idFloor,
        },
      });
      if (room.length > 0) {
        const dataRoom = room.map((e) => e.idRoom);
        const seat = await SeatModel.findAll({
          attributes: ["idSeat", "idRoom", "nameSeat"],
          where: {
            idRoom: {
              [Op.in]: dataRoom,
            },
          },
        });
        return res.send({ status: 1, allSeat: seat });
      } else {
        return res.send({ status: 0, message: "Cannot get Seat" });
      }
    } catch (err) {
      console.error(err);
    }
  },
  getSeat: async function (req, res) {
    try {
      const seat = await SeatModel;
      res.send("seat");
    } catch (e) {
      console.log(e);
    }
  },
  getSeatReceptionist: async function (req, res) {
    try {
      const seat = await SeatModel.findOne({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 17,
        },
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
      });
      return res.send({ status: 1, data: seat });
    } catch (e) {
      console.log(e);
      return res.send({ message: "error", staus: 0 });
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
      });

      const seat_bod = await SeatModel.findOne({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 5,
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
          seat_bod: seat_bod,
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
      });

      const seat_bod_1 = await SeatModel.findOne({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 18,
        },
      });

      const seat_bod_2 = await SeatModel.findOne({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 19,
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
        seat_bod_1: seat_bod_1,
        seat_bod_2: seat_bod_2,
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
        order: [
          ["idSeat", "ASC"], // Sắp xếp theo trường idSeat theo thứ tự tăng dần (ASC)
        ],
      });

      const seat_bod = await SeatModel.findAll({
        include: [
          {
            model: UserModel,
          },
        ],
        where: {
          idRoom: 11,
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
          seat_bod: seat_bod,
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
