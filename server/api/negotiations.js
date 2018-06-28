const router = require('express').Router();
const { DirectMessageChat } = require('../db/models');
module.exports = router;

router.get('/:id', (req, res, next) => {
  DirectMessageChat.findById(req.params.id)
  .then(channel => res.json(channel))
  .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  DirectMessageChat.create()
  .then(channel => res.json(channel))
  .catch(err => console.log(err))
})
