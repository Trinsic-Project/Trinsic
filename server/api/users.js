const router = require('express').Router()
const { User, DirectMessageChat } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    include: [{model: User, as: 'Match'}]
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