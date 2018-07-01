const router = require('express').Router()
const User = require('../db/models/user')
const Contract = require('../db/models/contract')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {email: req.body.email},
    include: [{model: Contract}]})
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  if (req.user) {
    User.findOne({
    where: {email: req.user.email},
    include: [{model: Contract}]})
    .then(user => {
      res.json(user)
    })
  } else {
    res.json(req.user)
  }
})

router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'))