const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.put('/:userId', async (req, res, next) => {
	let user = await User.findById(req.params.userId)
	let tutor = await User.findById(req.body.tutorId, {include: [{model: User, as: 'match'}]})
	user
    .addMatch(tutor)
    .then(status => {
    	return tutor.getDataValue('match')})
    .then(updated => {
    	let matched = updated.filter(match => {return match.id===user.id}).length
    	if (matched) res.json({status: true})//if user & tutor both matched return true
    	else res.json({status: false})//if only user matched return true
    })
    .catch(next)
})
