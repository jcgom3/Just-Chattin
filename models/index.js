const Message = require('./Messages');
const Room = require('./Rooms.js');
const User = require('./Users');

User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

module.exports = {User, Room, Message};