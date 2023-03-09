const express = require('express');
const router = express.Router();
const FreePost = require('./../models/FreePost.model')
const User = require('./../models/User.model')



router.get('/posts', async (req, res, next) => {
    try {
        const allPosts = await FreePost.find().populate('owner')
        res.json(allPosts)

    } catch (error) {
        next(error)
    }
})







module.exports = router;