const router = require('express').Router();
const { Message } = require('../db/models');
module.exports = router;

router.get('/:negotiationId', (req, res, next) => {
    //Add security so that only the two parties involved can access this endpoint
    Message.findAll({
        where: {
            DirectMessageChatId: req.params.negotiationId
        }})
    .then(messages => res.json(messages))
    .catch(err => console.log(err))
  })
  

router.post('/', (req, res, next) => {
  Message.create(req.body)
  .then(message => res.json(message))
  .catch(next)
})
