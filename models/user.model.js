const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
const SeatModel = require("./seat.model");

const UserModel = sequelize.define(
  "user",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idSeat: {
      type: DataTypes.INTEGER,
      references: {
        model: SeatModel,
        key: 'idSeat'
      }
    },
  },
  {
    tableName: "user",
  }
);

UserModel.belongsTo(SeatModel, { foreignKey: 'idSeat' });
SeatModel.hasOne(UserModel, { foreignKey: 'idSeat' });

UserModel.sync({ alter: true });


module.exports = UserModel;
