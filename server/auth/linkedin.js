const passport = require('passport')
const router = require('express').Router()
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
  console.log('Linkedin client ID / secret not found. Skipping Linkedin OAuth.')
} else {
  const linkedinConfig = {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK,
    scope: ['r_emailaddress', 'r_basicprofile']
  }

  const strategy = new LinkedinStrategy(
    linkedinConfig,
    (token, refreshToken, profile, done) => {
      const linkedinId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      User.find({where: {linkedinId}})
        .then(
          foundUser =>
            foundUser
              ? done(null, foundUser)
              : User.create({name, email, linkedinId}).then(createdUser =>
                  done(null, createdUser)
                )
        )
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('linkedin', {scope: 'r_emailaddress'}))

  router.get(
    '/callback',
    passport.authenticate('linkedin', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
