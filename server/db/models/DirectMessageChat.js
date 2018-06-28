const Sequelize = require('sequelize');
const db = require('../db.js');

const DirectMessageChat = db.define('directMessageChat');

module.exports = DirectMessageChat;
