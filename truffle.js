// Allows us to use ES6 in our migrations and tests.
require('babel-register') // May be using older version

module.exports = {
  networks: {
    development: {
      host: '206.81.11.213',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
}
