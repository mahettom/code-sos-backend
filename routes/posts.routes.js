const express = require('express');
const router = express.Router();
const FreePost = require('./../models/FreePost.model')
const User = require('./../models/User.model')



router.get('/', async (req, res, next) => {
    try {
        const allPosts = await FreePost.find().populate('owner')
        res.json(allPosts)

    } catch (error) {
        next(error)
    }
})

router.post('/create', async (req, res, next) => {
    console.log(req.user)
    const { question, code_example } = req.body
    try {
        const postToCreate = await FreePost.create({ question, code_example, owner: req.user._id })
        res.json(postToCreate)
    } catch (error) {
        next(error)
    }
})




module.exports = router;