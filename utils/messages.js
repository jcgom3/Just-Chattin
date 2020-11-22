const moment = require('moment');

function formatMessage(username, user_id, text) {
  return {
    username,
    user_id,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
