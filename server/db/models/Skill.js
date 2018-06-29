const Sequelize = require('sequelize');
const db = require('../db.js');

const Skill = db.define('skill', {

  name: {
    type: Sequelize.STRING
  },

  rating: {
    type: Sequelize.INTEGER
  }

});

module.exports = Skill;
