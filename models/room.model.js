const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const RoomModel = sequelize.define(
  "room",
  {
    idRoom: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idFloor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameRoom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "room",
  }
);
RoomModel.sync({ alter: true });

module.exports = RoomModel;
