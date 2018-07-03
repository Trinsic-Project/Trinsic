const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.put('/:userId', async (req, res, next) => {
	let user = await User.findById(req.params.userId, {include: [{model: User, as: 'match'}]})
	let tutor = await User.findById(req.body.tutorId, {include: [{model: User, as: 'match'}]})
	user
    .addMatch(tutor)
    .then(() => {
        res.json(tutor)})
    .catch(next)
})
