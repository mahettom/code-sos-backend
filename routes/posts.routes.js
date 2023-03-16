const express = require('express');
const Comment = require('../models/Comment.model');
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
    // console.log(req.user)
    const { question, code_example } = req.body
    try {
        const postToCreate = await FreePost.create({ question, code_example, owner: req.user._id })
        res.status(201).json(postToCreate)
    } catch (error) {
        next(error)
    }
})

router.get('/:postId', async (req, res, next) => {
    try {

        const postDetails = await FreePost.findById(req.params.postId).populate('owner')
        const allComments = await Comment.find({ posting: req.params.postId })
        res.json({ postDetails, allComments })
    } catch (error) {
        next(error)
    }
})

router.patch('/:postId', async (req, res, next) => {
    try {
        // console.log('req.params is :', req.parmams)
        // console.log('req.body is :', req.body)

        const id = req.params.postId
        const { question, code_example } = req.body
        console.log('req.body is :', question, code_example)
        console.log('req.params is :', id)


        const updatedPost = await FreePost.findByIdAndUpdate(
            id,
            { question, code_example },
            { new: true },
        )
        console.log('updatedPost', updatedPost)
        res.status(202).json({ updatedPost })
    } catch (error) {
        next(error)
    }
})


router.delete('/:postId', async (req, res, next) => {
    try {

        await FreePost.findByIdAndDelete(req.params.postId)
        res.sendStatus(204)
    } catch (error) {
        next(error)

    }
})

router.post('/:postId', async (req, res, next) => {

    const author = req.user._id
    const { comment } = req.body
    const posting = req.params.postId

    try {
        const commentToCreate = await Comment.create({ author, comment, posting })
        res.json(commentToCreate)
    } catch (error) {
        next(error)
    }
})

module.exports = router;