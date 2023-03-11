const express = require('express');
const User = require('../models/User.model');
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const tutors = await User.find({ isTutor: true })
        res.json(tutors)
    } catch (error) {
        next(error)
    }
})





module.exports = router;