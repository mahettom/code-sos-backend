require('dotenv').config()
require('./../db')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(process.env.SEED_PASSWORD, salt)
const User = require('./../models/User.model')
const FreePost = require('./../models/FreePost.model')

const users = [
    {
        username: 'Keifer',
        email: 'keifer@azerty.com',
        password: hashedPassword,
        isTutor: true,
    }, {
        username: 'Fabien',
        email: 'fabien@azerty.com',
        password: hashedPassword,
        isTutor: false,
    },
    {
        username: 'toto',
        email: 'toto@azerty.com',
        password: hashedPassword,
        isTutor: false,
    },
]

const freePosts = [
    {
        question: 'Do you know how to solved this, hihi',
        code_example: ''
    }, {
        question: 'Ok i need help ?',
        code_example: 'console.log("woooow")'

    }, {
        question: 'Is anyone heeeeeere ??',
        code_example: 'console.log("woooow")'

    }, {
        question: 'what a beautiful web site',
        code_example: 'console.log("woooow")'
    },
]

seed()

async function seed() {
    await User.deleteMany()
    await FreePost.deleteMany()
    const createdUsers = await User.create(users)
    for (const question of freePosts) {
        question.owner = randomUser(createdUsers)
    }
    console.log(createdUsers);
    await FreePost.create(freePosts)
    // erase me if there is a problem
    // await Sighting.create(comments)
    process.exit()
}

function randomUser(array) {
    return array[Math.floor(Math.random() * array.length)]._id
}