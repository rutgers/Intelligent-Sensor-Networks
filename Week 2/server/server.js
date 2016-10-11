//server.js
//Author: Rutgers ISN Team

//Allows parsing of HTTP request bodies
const bodyParser = require("body-parser");
//Web framework for node that simplifies development of web apps
const express = require("express");
//Simulate DELETE and PUT HTTP requests
const methodOverride = require("method-override");
//Provides MongoDB object modeling (makes DB interactions easier)
const mongoose = require("mongoose");
//Logs HTTP requests to the console
const morgan = require("morgan");

//Load in routes
const routes = require("./routes/routes");

//Initialize express application
const app = express();

//Connect to our MongoDB instance
mongoose.connect("mongodb://localhost:27017");

//Set up middleware for application
//Set up static files to be served
app.use(express.static(__dirname +"/../client"));
//Log HTTP requests to console (dev = colors!)
app.use(morgan("dev"));
//Parse url-encoded data
app.use(bodyParser.urlencoded());
//Parse JSON data
app.use(bodyParser.json());
app.use(methodOverride());

//Add routes to our application
app.use("/api", routes);

//Send index.html when hitting frontpage
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

//If running server on different environment, use configured environment's port.
//Otherwise, use 8080
const port = process.env.PORT || 8080;

//Listen for connections on port
app.listen(port, (err) => {
    if (err) console.log("Error: " + err);

    console.log("Server currently listening on port " + port + "!");
});
