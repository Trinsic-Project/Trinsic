const router = require('express').Router();
const { DirectMessageChat } = require('../db/models');
module.exports = router;

router.post('/', (req, res, next) => {
  DirectMessageChat.create()
  .then(channel => res.json(channel))
  .catch(err => console.log(err))
})
