const express = require('express');
const router = express.Router();
const FreePost = require('../models/FreePost.model.js')
const User = require('../models/User.model')

router.get('/', async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        res.json({ user })
    } catch (err) {
        next(err)
    }
})
router.get(':profileId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.profileId)
        const myPost = await FreePost.find({ owner: user._id })
        res.json(user, myPost)
    } catch (err) {
        next(err)
    }
})

module.exports = router;






