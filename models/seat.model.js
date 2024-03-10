const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./user.model");

const SeatModel = sequelize.define(
  "seat",
  {
    idSeat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRoom: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    nameSeat: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "seat",
  }
);

// Định nghĩa mối quan hệ đúng cách

module.exports = SeatModel;
