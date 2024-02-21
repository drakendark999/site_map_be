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
};
