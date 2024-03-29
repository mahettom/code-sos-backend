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
        const allComments = await Comment.find({ posting: req.params.postId }).populate('author')
        res.json({ postDetails, allComments })
    } catch (error) {
        next(error)
    }
})


router.patch('/:postId', async (req, res, next) => {
    try {

        const id = req.params.postId
        const { question, code_example } = req.body

        const updatedPost = await FreePost.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { question, code_example },
            { new: true },
        )

        if (!updatedPost) {
            return res.status(404).json({ message: "No Post found!" })
        }

        res.status(202).json({ updatedPost })
    } catch (error) {
        next(error)
    }
})


router.delete('/:postId', async (req, res, next) => {
    try {

        await FreePost.findOneAndDelete({ _id: req.params.postId, owner: req.user._id })
        res.sendStatus(204)
    } catch (error) {
        next(error)

    }
})

router.post('/:postId', async (req, res, next) => {

    try {
        const author = req.user._id
        const { comment } = req.body
        const posting = req.params.postId
        // console.log('FROM CREATE COMMENT ROUTE');
        // console.log('author ->', author);
        // console.log('new comment ->', comment);
        // console.log('author ->', author);



        const commentToCreate = await Comment.create({ author, posting, comment })
        res.status(201).json(commentToCreate)

    } catch (error) {
        next(error)
    }
})

module.exports = router;