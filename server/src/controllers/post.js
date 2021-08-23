const Post = require('../models/post.model'); // post model

var controller = {

    getAllPosts: (req, res) => {
        Post.find({} , function(err, result){
            if(err){
                res.status(400).send({
                    'success': false,
                    'error': err.message
                });
            }
            res.status(200).send({
                'success': true,
                'data': result
            });
        });
    },

    getPost: (req, res) => {
        Post.findById(req.params.post_id, function (err, result) {
            if(err){
                res.status(400).send({
                    success: false,
                    error: err.message
                });
            }
            res.status(200).send({
                success: true,
                data: result
            });
        });
    },

    addPost: (req, res) => {
        let newPost = {
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        };
        Post.create(newPost, function(err, result) {
            if(err){
                res.status(400).send({
                success: false,
                error: err.message
                });
            }
            res.status(201).send({
                success: true,
                data: result,
                message: "Post created successfully"
            });
        });
    },

    editPost: (req, res) => {
        let fieldsToUpdate = req.body;
        Post.findByIdAndUpdate(req.params.post_id,{ $set: fieldsToUpdate }, { new: true },  function (err, result) {
            if(err){
                res.status(400).send({
                    success: false,
                    error: err.message
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "Post updated successfully"
            });
        });
    },

    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.post_id, function(err, result) {
            if(err){
                res.status(400).send({
                    success: false,
                    error: err.message
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "Post deleted successfully"
            });
        });
    }
}

module.exports = controller;