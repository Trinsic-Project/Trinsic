'use strict'

const db = require('../server/db')
const { User, Skill } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'anna@email.com', password: 'a', firstName: 'Anna', lastName: 'Arden', streetAddress: '1234 West 99th Street', city: 'Brooklyn', state: 'New York', biography: 'My name is Anna and I am a part-time freelance software developer who loves working with children and adults to help them learn to code. I have professional experience both as a software developer and have worked as a tutor teaching kids ages 6-18 how to code with different programming languages. I also have volunteered multiple times to help women learn to code in a one on one environment. I can help teach children from ages 4-10 learn Scratch (and basic computer skills) which easily helps a child learn programming concepts as well as provide computer programming tutoring in Python, JavaScript, HTML/CSS and Ruby for people ages 7 and above. I am a kind, patient, problem solving and creative person who also has experience in babysitting children if needed. I have a very flexible schedule so that I am available for both full time and part time work for the upcoming year. I am open to both long term and short term arrangements and can shift my hours to accommodate different schedules.', imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=350'}),
    User.create({email: 'brent@email.com', password: 'b', firstName: 'Brent', lastName: 'Bell', streetAddress: '5678 West 97th Street', city: 'Brooklyn', state: 'New York', biography: 'Hello families and friends! Do you need my help cooking delicious and nutritious meals for your families, parties, or just for you? I am an experienced home chef living in NYC. I cook Taiwanese, Korean, Japanese, Italian, Mexican, American, French, Russian, Polish, and creative food. I love cooking so much and I would love to share my passion and help you out! I love being healthy and believe that fresh cooked meals can nourish your body and mind. My work has been featured on Manhattan Digest, I am known as Chef Mon Mon.n', imageUrl: 'https://images.pexels.com/photos/927677/pexels-photo-927677.jpeg?auto=compress&cs=tinysrgb&h=350'}),
    User.create({email: 'chris@email.com', password: 'c', firstName: 'Chris', lastName: 'Cordir', streetAddress: '1234 West 87th Street', city: 'Brooklyn', state: 'New York', biography: 'I am an experienced and patient teacher with strong academic background. I love music and have dedicated my entire life to the understanding and appreciation of sonic arts. My favorite instruments are keyboards and drums. I have over 20 years of teaching piano and other music related subjects including music history, theory, and musicology. I have taught in private setting (at my studio and at my students homes) as well as at some of the most prestigious institutions of higher education in New York metropolitan area. I have taught children and adults. I especially delight in helping beginners discover the beauties of music, the keyboard instruments and music and the basics of music notation. I have two graduate degrees in music from Columbia University and have studied piano and music education at NYU.', imageUrl: 'https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg?auto=compress&cs=tinysrgb&h=350'}),
    User.create({email: 'derek@email.com', password: 'd', firstName: 'Derek', lastName: 'Dask', streetAddress: '5678 West 32nd Street', city: 'Brooklyn', state: 'New York', biography: 'I am an experienced tutor, fluent in Spanish, who has provided individual and group instruction in the Spanish language, reading comprehension, analytical writing, and English as a second language. My students range from the ages of eight to 18. Additionally, I have served as a classroom Spanish instructor for grades one through four. I have a Bachelor\'s of Arts in Spanish and Literature and have spent extensive time in Chile, Guatemala and Ecuador, as well as serving as a Spanish interpreter in the medical field.', imageUrl: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}),
    User.create({email: 'edison@email.com', password: 'e', firstName: 'Edison', lastName: 'Earvin', streetAddress: '1234 West 44th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}),
    User.create({email: 'frank@email.com', password: 'f', firstName: 'Frank', lastName: 'Fila', streetAddress: '5678 West 55th Street', city: 'Brooklyn', state: 'New York', biography: 'I am an artist. I had multiple exhibitions in many Russian galleries and museums and I had a solo exhibition in New York in 2013. I am highly skilled in different painting techniques and I am proficient in photography and photo editing. I create and experiment myself and I love to share my passion about art with others. I strive to inspire children and adults to open their talents and enjoy with art activities. I have diverse teaching experience. Currently I lead art workshops for children and teenagers in the Community Center in Brooklyn. I was involved in different educational programs at the Municipal Center of Visual arts in Novosibirsk, which included individual tutoring, giving lectures and workshops for children and adults. In 2015 I contributed to the international online conference Possibilities of Art in Education, giving a presentation about New York Art residencies.', imageUrl: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}),
    User.create({email: 'gabby@email.com', password: 'g', firstName: 'Gabby', lastName: 'Gadrizo', streetAddress: '1234 West 11th Street', city: 'Brooklyn', state: 'New York', biography: 'I am a retired high school math teacher with 30 years tutoring experience. I typically tutor on weekends online or in my office in Westchester. Middle through high school math are my favorite areas to teach. I also love teaching for Regents, SATs and APs. I graduated with a BS in mathematics, and excelled in math through vector calculus. I would love to help you succeed in math and can advise on college/medical school applications.', imageUrl: 'https://images.pexels.com/photos/788567/pexels-photo-788567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}),
    User.create({email: 'heather@email.com', password: 'h', firstName: 'Heather', lastName: 'Hope', streetAddress: '5678 West 32nd Street', city: 'Brooklyn', state: 'New York', biography: 'Hi, my name is Heather. I have been a tutor since elementary school. I graduated a year early from high school with an advanced regents diploma and a certification in medical assisting. I am currently enrolled in college as a science major and math minor. I love all subjects and have taken biochemistry, chemistry, physics, anatomy and physiology and other basic classes that are needed. I excel in all subjects and was able to graduate early because of that. I am computer savvy and understand all of the new methods of teaching such as the core curriculum and the stem program.', imageUrl: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&h=350'}),
    User.create({email: 'iris@email.com', password: 'i', firstName: 'Iris', lastName: 'Isle', streetAddress: '1234 West 43rd Street', city: 'Brooklyn', state: 'New York', biography: '', imageUrl: 'https://images.pexels.com/photos/871494/pexels-photo-871494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}),
    User.create({email: 'jane@email.com', password: 'j', firstName: 'Jane', lastName: 'Jazz', streetAddress: '5678 West 58th Street', city: 'Brooklyn', state: 'New York', biography: 'this is a biography', imageUrl: "https://images.pexels.com/photos/253758/pexels-photo-253758.jpeg?auto=compress&cs=tinysrgb&h=350"})
  ])

  const skills = await Promise.all([
    Skill.create({name: 'Computer Programming', imagePath: '/skills_photos/computerProgramming.jpeg'}),
    Skill.create({name: 'Cooking', imagePath: '/skills_photos/cooking.jpeg'}),
    Skill.create({name: 'Second Language', imagePath: '/skills_photos/language.jpeg'}),
    Skill.create({name: 'Music', imagePath: '/skills_photos/music.jpg'}),
    Skill.create({name: 'Skateboarding', imagePath: '/skills_photos/skateBoarding.jpeg'}),
    Skill.create({name: 'Art', imagePath: '/skills_photos/art.jpeg'}),
    Skill.create({name: 'Math', imagePath: '/skills_photos/math.jpeg'}),
    Skill.create({name: 'Science', imagePath: '/skills_photos/science.jpeg'}),
    Skill.create({name: 'Driving', imagePath: '/skills_photos/driving.jpg'}),
    Skill.create({name: 'Athletics', imagePath: '/skills_photos/athletics.jpeg'}),
  ])

  const userSkills = await Promise.all(
    users.map(async user => {console.log(user.id, user.firstName, skills[((user.id - 1) % skills.length) + 1]); await user.setSkills((((user.id - 1) % skills.length) + 1))}
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
