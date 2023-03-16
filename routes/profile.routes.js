const express = require('express');
const router = express.Router();
const FreePost = require('../models/FreePost.model.js');
const HelpRequest = require('../models/HelpRequest.model.js');
const User = require('../models/User.model')


router.get('/', async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const myPosts = await FreePost.find({ owner: user._id })
        const allHelp = await HelpRequest.find({ tutor: user._id }).populate("owner")

        res.json({ user, myPosts, allHelp })
        console.log(allHelp)
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

router.post('/help/:profileId', async (req, res, next) => {
    try {

        const owner = req.user._id
        const { question } = req.body
        const tutor = req.params.profileId

        const helpRequest = await HelpRequest.create({ question, owner, tutor })

        res.status(201).json({ helpRequest })
    } catch (error) {
        next(error)
    }
})

module.exports = router;






