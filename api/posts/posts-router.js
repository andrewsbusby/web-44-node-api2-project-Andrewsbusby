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

module.exports = router;