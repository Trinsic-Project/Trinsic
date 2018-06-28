const User = require('./user')
const Message = require('./Message.js');
const DirectMessageChat = require('./DirectMessageChat.js');

Message.belongsTo(User);
User.hasMany(Message);

DirectMessageChat.hasMany(Message);
Message.belongsTo(DirectMessageChat);

DirectMessageChat.belongsToMany(User, {through: 'negotiation'});
User.belongsToMany(DirectMessageChat, {through: 'negotiation'});

//establish user matches
User.hasMany(User, {as: 'Match', foreignKey: "MatchId"})
User.belongsTo(User, {foreignKey: "MatchId"})



module.exports = {
  User,
  Message,
  DirectMessageChat
}
