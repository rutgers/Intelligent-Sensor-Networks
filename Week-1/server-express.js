//server-express.js
//Author: Rutgers IEEE ISN Team

//Can import npm modules using same require syntax
var express = require("express");
var moment = require("moment");

//Initialize express application
var app = express();
//If running server on different environment, use configured environment's port.
//Otherwise, use 8080
var port = process.env.PORT || 8080;

//Get time of request
function requestTime(req, res, next) {
    req.requestTime = moment().format();
    next();
}

//Generate a random number
function randomNumber(req, res, next) {
    req.randomNumber = Math.random();
    next();
}

//Error-handling middleware
function errorHandler(err, req, res, next) {
    console.log(err);
    //Set HTTP status as well as message
    //res.status(500).send("Something blew up!");
}

app.use(requestTime);
app.use(randomNumber);
app.use(errorHandler);

//Instead of manually checking for URL, you can use HTTP verbs to define the
//application's routing
app.get("/", function(req, res) {
    res.send("My first Express server! Request made at: " + req.requestTime +
        ". Your random number is: " + req.randomNumber);
});

//Listen for connections on port
app.listen(port, function(err) {
    //Callback to check for error
    if (err) return console.log("Oh no! Something blew up!", err);

    console.log("Server is listening on port " + port + "!");
});
