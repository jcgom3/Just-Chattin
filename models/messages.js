const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Messages extends Model {}

// create fields/columns for Messages model
Messages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    room_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  },
);

module.exports = Messages;