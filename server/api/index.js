const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/negotiations', require('./negotiations'))
router.use('/messages', require('./messages'))
router.use('/match', require('./match'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
