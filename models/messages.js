const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our messages model
class Messages extends Model {

    /* do i need this for room model?

  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
  */

}

// create fields/columns for User model
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