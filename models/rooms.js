const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Room extends Model {}

// create fields/columns for Room model
Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    room_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  },
);

module.exports = Room;
  