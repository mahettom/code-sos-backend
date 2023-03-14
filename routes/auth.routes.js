const express = require("express");//create the router file
const bcrypt = require('bcryptjs'); //encrypting the password before saving to the database
const jwt = require("jsonwebtoken");//creates and signs the new token
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");
const fileUpload = require('../config/cloudinary.js')

const router = express.Router();
const saltRounds = 10;

// POST  /auth/signup
router.post('/signup', fileUpload.single('profilePic'), (req, res, next) => {
    const { email, password, username, isTutor } = req.body
    const image = req.file
    console.log(image)

    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: "Provide email, password, username" })
        return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a vaild email address' })
        return
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' })
        return
    }
    User.findOne({ username })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: 'User already exist' })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            return User.create({ email, password: hashedPassword, username, isTutor, profilePic: image.path })
        })
        .then((createdUser) => {
            const { email, username, _id, isTutor } = createdUser
            const user = { email, username, _id, isTutor }
            res.status(201).json({ user: user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// POST  /auth/login
router.post('/login', (req, res, next) => {
    const { username, password } = req.body

    if (username === '' || password === '') {
        res.status(400).json({ message: 'You need to provide an username and a password' })
        return
    }

    User.findOne({ username }).select('password')
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: 'Username not found' })
                return
            }

            const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
            console.log(passwordCorrect)
            if (passwordCorrect) {

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )
                res.status(200).json({ authToken: authToken })
            }
            else {
                res.status(401).json({ message: 'Unable to authenticate the user' })
            }
        })
        .catch(error => res.status(500).json({ message: 'Internal server error' }))
})


// GET  /auth/verify
// router.get('/') isAuthenticated (req, res, next)
router.get('/verify', isAuthenticated, (req, res, next) => {
    // console.log(`req.user`, req.user);
    res.status(200).json(req.user)
})


module.exports = router;