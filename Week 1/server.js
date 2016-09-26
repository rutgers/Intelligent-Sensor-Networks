//server.js
//Author: Rutgers IEEE ISN Team

//Comments are just like single like comments in Java/C/C++

/*
 * or you can do multiline comments
 * like this!
 */

//Use require to import modules into your program
var http = require("http");
//If running server on different environment, use configured environment's port.
//Otherwise, use 8080
var port = process.env.PORT || 8080;

//Functions are first-class objects, you can treat them as variables
//and even pass them around as inputs to other functions
function requestHandler(req, res) {
    console.log(req.url);
    res.end("My first Node.js server!");
}

//Create the server with the request handler function, it is invoked every
//time a request hits the server.
var server = http.createServer(requestHandler);

//Listen on port number for incoming connections
server.listen(port, function(err) {
    //Callback to check for error
    if (err) return console.log("Oh no! Something blew up!", err);

    console.log("Server is listening on port " + port + "!");
});
