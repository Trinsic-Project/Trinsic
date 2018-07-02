const Sequelize = require('sequelize');
const db = require('../db.js');

const Negotiations = db.define('negotiations');

module.exports = Negotiations;