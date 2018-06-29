const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  firstName: {
    type: Sequelize.STRING,
  },

  lastName: {
    type: Sequelize.STRING,
  },

  streetAddress: {
    type: Sequelize.STRING,
  },

  city: {
    type: Sequelize.STRING,
  },

  state: {
    type: Sequelize.STRING,
  },

  biography: {
    type: Sequelize.TEXT
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKwzW79MfeLRUf6nDYgj_baXP4Rj-Xj7BsbhEztJrqVPudrzZbQ",
    validate: {
      isUrl: true
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password')
    }
  },

  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },

  googleId: {
    type: Sequelize.STRING
  },

  fullName: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
    }
  }
})

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

// User.findByEmail = function(targetEmail) {
//   return User.findOne({
//     where: {
//       email: targetEmail
//     }
//   })
// }

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
