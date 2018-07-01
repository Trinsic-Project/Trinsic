const router = require('express').Router()
const { User, DirectMessageChat, Negotiaitons } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    include: [
      {model: User, as: 'match', 
      include:[{
        model: User, as: 'match'}]}]})
    .then(users => res.json(users))
    .catch(next)
})
router.get('/negotiations', (req, res, next) => {
  DirectMessageChat.findAll({
    include: [{
      model: User
    }]
  })
  .then(channel => res.json(channel))
  .catch(err => console.log(err))
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, {
    include: [
        {model: User, as: 'match', 
        include:[{
          model: User, as: 'match'}]}]})
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next)
})