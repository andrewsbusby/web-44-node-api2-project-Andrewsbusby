// implement your posts router here
const express = require('express');
const Post = require('./posts-model');

const router = express.Router()

// FIND ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(req.query)
        res.status(200).json(posts)
    }
    catch (error) {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    }
})

// FIND POST BY ID
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

// CREATE A NEW POST
router.post('/', (req, res) =>{
    Post.insert(req.body)
        .then(newPost => {
            if (newPost) {
                res.status(201).json(newPost)
            } else {
                res.status(400).json({
                    message: "Please provide title and contents for the post"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

// DELETE POST
router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(removed => {
            if (!removed) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(removed)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
})

// GET POST BY ID AND COMMENTS
router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(comments => {
            if (!comments) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router;