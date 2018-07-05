const router = require('express').Router()
const { User, DirectMessageChat, Skill, Contract, UserContracts } = require('../db/models')
const { Op } = require('sequelize')
const { sendEmail } = require('../../utils')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    where: {
      id: {
        [Op.ne]: req.user.id
      }
    },
    include: [{
      model: User, as: 'match',
      include:[{
        model: User, as: 'match'}]
    }, {
      model: Skill
    }]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/skills', (req, res, next) => {
  Skill.findAll()
  .then(skills => res.json(skills))
  .catch(next)
})

router.post('/skills/:skillId', (req, res, next) => {
  Skill.findById(req.params.skillId)
  .then(skill => {
    skill.setUsers(req.user.id);
    res.json(skill);
  })
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
    include: [{
      model: User, as: 'match',
        include:[{
          model: User, as: 'match'}]},
    {
      model: Skill
    },
    {
      model: Contract
    }
        ]})
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next)
})

router.post('/contracts', (req, res, next) => {
  console.log("this is the req.body", req.body)
  sendEmail(req.user.dataValues)
  Contract.create({contractAddress: req.body.contractAddress})
    .then(contract => {
        contract.setUsers([req.body.initiator.id, req.body.tutorId]) //figure out how to pass in both users from front end
        res.json(contract)
    })
    .catch(next)
})

//Route to change a contract instance open status from True to False
router.post('/contracts/finalize', (req, res, next) => {
  console.log(req.body)
  Contract.findOne({
    where: {
        contractAddress: req.body.contractAddress
    }
  })
    .then(contract => {
      return contract.update({isStatusOpen: false})
    })
    .then(finalizedContract => {
      res.json(finalizedContract)
    })
    .catch(next)
})

router.get('/:userId/contracts', (req, res, next) => {
  UserContracts.findAll({
    where: {
      userId: req.params.userId}
  })
    .catch(next)
})
