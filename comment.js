// Create web server

var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var fs = require("fs");

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read data from file
var data = fs.readFileSync(__dirname + "/data.json", "utf8");
var comments = JSON.parse(data);

// Create web server
app.listen(port, function() {
    console.log("Server is running on port " + port);
});

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Set static folder
app.use(express.static("public"));

// Home page
app.get("/", function(req, res) {
    res.render("home");
});

// Show all comments
app.get("/comments", function(req, res) {
    res.render("comments", {comments: comments});
});

// Add new comment
app.post("/comments", function(req, res) {
    var newComment = {
        name: req.body.name,
        content: req.body.content
    };
    comments.push(newComment);
    res.redirect("/comments");
});

// Delete comment
app.get("/comments/delete/:id", function(req, res) {
    var id = req.params.id;
    comments.splice(id, 1);
    res.redirect("/comments");
});

// Edit comment
app.get("/comments/edit/:id", function(req, res) {
    var id = req.params.id;
    res.render("edit", {comment: comments[id]});
});

// Update comment
app.post("/comments/edit/:id", function(req, res) {
    var id = req.params.id;
    comments[id].name = req.body.name;
    comments[id].content = req.body.content;
    res.redirect("/comments");
});