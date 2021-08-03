// implement your posts router here
const express = require('express');
const Post = require('./posts-model');

const router = express.Router()

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

module.exports = router;