const express = require('express');
const router = express.Router();
const FreePost = require('../models/FreePost.model.js')
const User = require('../models/User.model')

router.get('/', async (req, res, next) => {
    try {
        const myPost = await FreePost.find({ owner: req.session.currentUser._id })
        const user = await User.findById(req.session.currentUser._id)
        res.json('profile', { user, myPost })
    } catch (err) {
        next(err)
    }
})







module.exports = router;