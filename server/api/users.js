const router = require('express').Router()
const { User, DirectMessageChat, Contract, UserContracts } = require('../db/models')
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

router.get('/:userId', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userId},
    include: [{model: Contract}]})
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
  Contract.create(req.body)
    .then(contract => {
        contract.setUsers([req.body.user1Id, req.body.user2Id]) //figure out how to pass in both users from front end
        res.json(contract)
    })
    .catch(next)
})

router.post('/contracts/finalize', (req, res, next) => {
  console.log(req)
  UserContracts.findOne({
    where: {
        userId: req.user.id
    }
  })
    .then(userContract => {
        Contract.findById(userContract.contractId) 
    })
    .then(contract => {
      contract.update(req.body)        
    })
    .then(contract => {
      res.json(contract)
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

// router.get('/:userId/contract', (req, res, next) => {
//   UserContracts.findOne({
//     where: {
//       userId: req.params.userId}
//   })
//     .then(contracts => {
//       UserContracts.findAll({
//         where: {
//           userId: req.params.userId}
//       })
//       res.json(contracts)})
//     .catch(next)
// })