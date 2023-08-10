// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// Create a comment
router.post('/', function(req, res, next) {
    var comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        post: req.body.post
    });

    comment.save(function(err, comment) {
        if (err) { return next(err); }
        res.status(201).json(comment);
    });
});

// Get all comments
router.get('/', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) { return next(err); }
        res.json(comments);
    });
});

// Get a comment
router.get('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(404); }
        res.json(comment);
    });
});

// Update a comment
router.put('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(404); }

        comment.username = req.body.username;
        comment.comment = req.body.comment;
        comment.post = req.body.post;

        comment.save(function(err, comment) {
            if (err) { return next(err); }
            res.json(comment);
        });
    });
});

// Delete a comment
router.delete('/:id', function(req, res, next) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(404); }
        res.json(comment);
    });
});

// Get all comments for a post
router.get('/post/:id', function(req, res, next) {
    Comment.find({ post: req.params.id }, function(err, comments) {
        if (err) { return next(err); }
        res.json(comments);
    });
});

// Get a comment for a post
router.get('/post/:id/:id', function(req, res, next) {
    Comment.find({ post: req.params.id, _id: req.params.id }, function(err, comment) {
        if (err) {