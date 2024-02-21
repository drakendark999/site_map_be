const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const SeatModel = sequelize.define(
  "seat",
  {
    idSeat: {
      type: DataTypes.TINYINT,
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

SeatModel.sync({ alter: true });

module.exports = SeatModel
