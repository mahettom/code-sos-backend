const express = require('express');
const router = express.Router();
const FreePost = require('../models/FreePost.model.js')
const User = require('../models/User.model')


router.get('/', async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const myPosts = await FreePost.find({ owner: user._id })
        res.json({ user, myPosts })
    } catch (err) {
        next(err)
    }
})


router.get('/:profileId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.profileId)
        if (!user) {
            return res.status(404).json({ message: 'No user' })
        }
        const theirPost = await FreePost.find({ owner: user._id })
        res.json({ user, theirPost })
    } catch (err) {
        next(err)
    }
})

module.exports = router;






