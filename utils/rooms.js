const { Room } = require('../models');

async function checkRoom(room){
    Room.findOne({
        where:{room_name: room}
    }).then(data =>{
        if (data) return true;
        else return false;
    })
}

module.exports = {checkRoom}