const Sequelize = require('sequelize');
const db = require('../db.js');

const Skill = db.define('skill', {

  name: {
    type: Sequelize.STRING
  },
  imagePath: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  }

});

module.exports = Skill;
