'use strict'

const db = require('../server/db')
const { User, Skill } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'anna@email.com', password: 'a', firstName: 'Anna', lastName: 'Arden', streetAddress: '1234 West 99th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=350'}),
    User.create({email: 'brent@email.com', password: 'b', firstName: 'Brent', lastName: 'Bell', streetAddress: '5678 West 97th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'}),
    User.create({email: 'chris@email.com', password: 'c', firstName: 'Chris', lastName: 'Cordir', streetAddress: '1234 West 87th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography', imageUrl: 'https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg?auto=compress&cs=tinysrgb&h=350'}),
    User.create({email: 'derek@email.com', password: 'd', firstName: 'Derek', lastName: 'Dask', streetAddress: '5678 West 32nd Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'}),
    User.create({email: 'edison@email.com', password: 'e', firstName: 'Edison', lastName: 'Earvin', streetAddress: '1234 West 44th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}),
    User.create({email: 'frank@email.com', password: 'f', firstName: 'Frank', lastName: 'Fila', streetAddress: '5678 West 55th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'}),
    User.create({email: 'gabby@email.com', password: 'g', firstName: 'Gabby', lastName: 'Gadrizo', streetAddress: '1234 West 11th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'}),
    User.create({email: 'heather@email.com', password: 'h', firstName: 'Heather', lastName: 'Hope', streetAddress: '5678 West 32nd Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'}),
    User.create({email: 'idris@email.com', password: 'i', firstName: 'Idris', lastName: 'Isle', streetAddress: '1234 West 43rd Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'}),
    User.create({email: 'jane@email.com', password: 'j', firstName: 'Jane', lastName: 'Jazz', streetAddress: '5678 West 58th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography'})
  ])

  const skills = await Promise.all([
    Skill.create({name: 'Computer Programming', imagePath: '/skills_photos/computerProgramming.jpeg'}),
    Skill.create({name: 'Cooking', imagePath: '/skills_photos/cooking.jpeg'}),
    Skill.create({name: 'Second Language', imagePath: '/skills_photos/language.jpeg'}),
    Skill.create({name: 'Music', imagePath: '/skills_photos/music.jpg'}),
    Skill.create({name: 'Skate Boarding', imagePath: '/skills_photos/skateBoarding.jpeg'}),
    Skill.create({name: 'Art', imagePath: '/skills_photos/art.jpeg'}),
    Skill.create({name: 'Math', imagePath: '/skills_photos/math.jpeg'}),
    Skill.create({name: 'Science', imagePath: '/skills_photos/science.jpeg'}),
    Skill.create({name: 'Driving', imagePath: '/skills_photos/driving.jpg'}),
    Skill.create({name: 'Athletics', imagePath: '/skills_photos/athletics.jpeg'}),
  ])

  const userSkills = await Promise.all(
    users.map(user => user.setSkills((((user.id - 1) % skills.length) + 1))
))

  console.log('seeding...')
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${skills.length} skills`)
  console.log(`seeded ${userSkills.length} users with ${skills.length} skills`)
  console.log(`seeded successfully`)
}

const exit = () => process.exit(0)
const die = err => {
  console.log(err)
  process.exit(1)
}

if (module === require.main) {
  seed().then(exit, die)
}

module.exports = seed
