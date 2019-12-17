const express = require('express');
const router = express.Router();
const db = require('../models/index');


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

router.post('/', function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
});

router.get('/:todoID', function(req, res) {
    db.Todo.findById(req.params.todoID)
    .then(function(foundTodo) {
        res.json(foundTodo)
    })
    .catch(function(err) {
        res.send(err);
    })
});

router.put('/:todoID', function(req, res) {
    db.Todo.findByIdAndUpdate({_id: req.params.todoID}, req.body, {new: true})
    .then(function(updatedTodo) {
        res.json(updatedTodo);
    })
    .catch(function(err){
        res.send(err);
    })
});

router.delete('/:todoID', function(req, res) {
    db.Todo.deleteOne({_id: req.params.todoID})
    .then(function(deletedTodo){
        res.json({message: "Todo has been deleted"})
    })
    .catch(function(err){
        res.send(err);
    })
})

module.exports = router;