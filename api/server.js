// implement your server here
const express = require('express');
const postRouter = require('./posts/posts-router');
const server = express();

server.unsubscribe(express.json());
// require your posts router and connect it here
server.use('/api/posts/posts-router.js', postRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1>Checkout these posts</h1>`)
})

module.exports = server;