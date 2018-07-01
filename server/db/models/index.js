const User = require('./user')
const Message = require('./Message.js');
const DirectMessageChat = require('./DirectMessageChat.js');
const Skill = require('./Skill.js');
const Negotiations = require('./Negotiaitons.js');

Message.belongsTo(User);
User.hasMany(Message);

DirectMessageChat.hasMany(Message);
Message.belongsTo(DirectMessageChat);

DirectMessageChat.belongsToMany(User, {through: Negotiations});
User.belongsToMany(DirectMessageChat, {through: Negotiations});

//establish user matches
User.hasMany(User, {as: 'match', foreignKey: "MatchId"});

// A user can possess many skills;
// In addition, a skill can be possessed by many users;
User.belongsToMany(Skill, { through: 'user_skill' });
Skill.belongsToMany(User, { through: 'user_skill' });

module.exports = {
  User,
  Message,
  DirectMessageChat,
  Skill,
  Negotiations
}
