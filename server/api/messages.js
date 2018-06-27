const router = require('express').Router();
const { Message } = require('../db/models');
module.exports = router;

router.post('/', (req, res, next) => {
  Message.create()
  .then(message => res.json(message))
  .catch(err => console.log(err))
})
