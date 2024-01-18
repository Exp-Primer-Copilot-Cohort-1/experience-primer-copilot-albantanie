// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Create comments array
const comments = [
    {
        username: 'taylor',
        comment: 'lol that is so funny!',
        postId: 1
    },
    {
        username: 'kanye',
        comment: 'I dont think thats funny!',
        postId: 2
    },
    {
        username: 'taylor',
        comment: 'I dont think thats funny!',
        postId: 2
    },
    {
        username: 'kanye',
        comment: 'lol that is so funny!',
        postId: 3
    }
];

// Get all comments
app.get('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const postComments = comments.filter((comment) => comment.postId === postId);
    res.send(postComments);
});

// Create a comment
app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const newComment = {
        username: req.body.username,
        comment: req.body.comment,
        postId: postId
    };

    comments.push(newComment);
    res.status(201).send(newComment);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});