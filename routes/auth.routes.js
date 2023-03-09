const express = require("express");//create the router file
const bcrypt = require('bcryptjs'); //encrypting the password before saving to the database
const jwt = require("jsonwebtoken");//creates and signs the new token
const User = require("../models/User.model");

const router = express.Router();
const saltRounds = 10;

// POST  /auth/signup
router.post('/signup', (req, res, next) => {
    const { email, password, username } = req.body

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
            return User.create({ email, password: hashedPassword, username })
        })
        .then((createdUser) => {
            const { email, username, _id } = createdUser
            const user = { email, username, _id }
            res.status(201).json({ user: user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// POST  /auth/login



// GET  /auth/verify
// ...


module.exports = router;