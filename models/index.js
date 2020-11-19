const Message = require('./messages.js');
const Room = require('./rooms.js');
const User = require('./users.js');

User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

module.exports = {User, Room, Message};