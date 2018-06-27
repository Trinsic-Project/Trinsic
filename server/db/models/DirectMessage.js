const Sequelize = require('sequelize');
const db = require('../db.js');

const DirectMessage = db.define('directMessage');

module.exports = DirectMessage;
