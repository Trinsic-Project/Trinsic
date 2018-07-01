const Sequelize = require('sequelize');
const db = require('../db.js');

const Contract = db.define('contract', {
  contractAddress: {
    type: Sequelize.STRING
  },
  isStatusOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Contract;
