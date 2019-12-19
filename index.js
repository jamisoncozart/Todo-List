const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      todoRoutes = require('./routes/todos');

//allows access to req.body on post requests, to write posted info to db
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//all static pages should be loaded from /views or /public directory
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

//define root route to load index.html
app.get('/', function(req, res) {
    res.send("index.html");
})

//import and use all routes from todoRoutes and preppend '/api/todos' to each route
app.use('/api/todos', todoRoutes);




//Starts server on port 3000
app.listen(3000, function(){
    console.log("server: spinning up on port 3000");
})