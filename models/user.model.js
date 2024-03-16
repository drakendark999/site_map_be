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
    msnv:{type: DataTypes.STRING,allowNull:false},
    nameUser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone:{
      type:DataTypes.STRING,
      allowNull : true
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
      },
      allowNull:true
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
