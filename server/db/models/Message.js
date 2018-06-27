const Sequelize = require('sequelize');
const db = require('../db.js');
const User = require('./user.js');

const Message = db.define('message', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Message;
