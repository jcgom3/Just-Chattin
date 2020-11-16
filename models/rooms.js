const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our Room model
class Room extends Model {

    /* do i need this for room model?

  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
  */

}

// create fields/columns for User model
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
  