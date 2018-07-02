const User = require('./user')
const Message = require('./Message.js');
const DirectMessageChat = require('./DirectMessageChat.js');
const Skill = require('./Skill.js');
const Contract = require('./Contract.js');
const UserContracts = require('./UserContracts.js');
const Negotiations = require('./Negotiaitons.js');

Message.belongsTo(User);
User.hasMany(Message);

DirectMessageChat.hasMany(Message);
Message.belongsTo(DirectMessageChat);

// A user can have many contracts;
// In addition, a contract will have two users
User.belongsToMany(Contract, {through: UserContracts});
Contract.belongsToMany(User, {through: UserContracts});

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
  Contract,
  UserContracts,
  Negotiations
}
