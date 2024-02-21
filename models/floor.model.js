const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const FloorModel = sequelize.define(
  "floor",
  {
    idFloor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameFloor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "floor",
  }
);
FloorModel.sync({ alter: true });

module.exports = FloorModel;
