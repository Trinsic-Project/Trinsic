const Sequelize = require('sequelize');
const db = require('../db.js');

const Contract = db.define('contract', {
  contractAddress: {
    type: Sequelize.STRING
  }
});

module.exports = Contract;
