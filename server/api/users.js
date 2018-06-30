const router = require('express').Router()
const { User, DirectMessageChat } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    include: [{model: User, as: 'match'}]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/negotiations', (req, res, next) => {
  //Add security so that only the two parties involved can access this endpoint
  User.findOne({
      where: {
          id: req.user.id
      },
      include: [{
        model: DirectMessageChat
      }]
    })
  .then(channels => res.json(channels))
  .next(next)
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, {include: [{model: User, as: 'match'}]})
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => user.update(req.body))
  .then(user => res.status(200).json(user))
  .catch(next);
})