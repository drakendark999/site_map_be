const UserModel = require("../models/user.model");

module.exports = {
  getUser: async function (req, res) {
    try {
      const user = await UserModel.findAll();
      res.send({ status: 1, data: user });
    } catch (e) {
      console.log(e);
    }
  },
  createNewUser: async (req, res) => {
    const data = req.body;
    try {
      await UserModel.create({
        msnv: data?.msnv,
        nameUser: data?.nameUser,
        phone: data?.phone,
        email: data?.email,
        birthday: data?.birthday,
        title: data?.title,
        avatar: data?.avatar,
      });
      res.send({ status: 1, data: data });
    } catch (err) {
      res.send({ status: 0, message: err });
    }
  },
  deleteUser: async (req, res) => {
    const idUser = req.body.idUser;
    try {
      const user = await UserModel.findByPk(idUser);
      if (!user) {
        res.send({ status: 0, message: "User này không tồn tại" });
      } else {
        await user.destroy();
        res.send({ status: 1 });
      }
    } catch (error) {
      res.send({ status: 0, message: error });
    }
  },
  updateUser: async (req, res) => {
    const idUser = req.body.idUser;
    const newData = req.body;
    try {
      const user = await UserModel.findByPk(idUser);
      if (!user) {
        res.status(404).send({ status: 0, message: "User này không tồn tại" });
      } else {
        await user.update(newData);
        res.send({ status: 1, message: "success" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 0, message: error });
    }
  },
};
