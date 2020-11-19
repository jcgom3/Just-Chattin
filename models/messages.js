const { Model, DataTypes } = require('sequelize');
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
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Messages;