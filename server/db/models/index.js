const User = require('./user')
const Message = require('./Message.js');

Message.belongsTo(User);
User.hasMany(Message);

module.exports = {
  User,
  Message
}
