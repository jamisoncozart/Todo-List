const express = require('express');
const router = express.Router();
const db = require('../models/index');

//API root route. Displays entire todo's collection from DB as JSON
router.get('/', function(req, res) {
    //calls mongo to find all "Todo"s in our DB
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
});

//Post request to root route will create new todo in DB
router.post('/', function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
});

//Get request to specific todo ID will respond with specific todo JSON
router.get('/:todoID', function(req, res) {
    db.Todo.findById(req.params.todoID)
    .then(function(foundTodo) {
        res.json(foundTodo)
    })
    .catch(function(err) {
        res.send(err);
    })
});

//Put request to secific todo ID will find todo in DB and update with request body parameters
router.put('/:todoID', function(req, res) {
    db.Todo.findByIdAndUpdate({_id: req.params.todoID}, req.body, {new: true})
    .then(function(updatedTodo) {
        res.json(updatedTodo);
    })
    .catch(function(err){
        res.send(err);
    })
});

//Delete request to specific todo ID will delete todo with ID from DB
router.delete('/:todoID', function(req, res) {
    db.Todo.deleteOne({_id: req.params.todoID})
    .then(function(deletedTodo){
        res.json({message: "Todo has been deleted"})
    })
    .catch(function(err){
        res.send(err);
    })
})

//exports router object containing all routes
module.exports = router;