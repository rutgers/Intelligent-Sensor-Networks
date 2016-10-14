# Intelligent Sensor Networks

## Week 1 - Introduction to Node.js, npm, and Package Management

### 0. Installing Node.js

For this workshop, please install the latest version of Node.js. For Windows and Mac users, you can download the installer [here](https://nodejs.org/en/download/current/). For Linux users, you can also download the source code from [here](https://nodejs.org/en/download/current/). Even easier, you can use your distro's package manager to install Node.js.

#### Verify installation

Once installation has completed, verify that the correct version of `node` and `npm` are installed:

1. Open a terminal window.
2. Type `node -v`. The version number should be **6.x**. If you get a "Command not found error", there may have been an error with installation.
3. Type `npm -v`. The version number should be **3.x**.

### 1. A little about Node.js

Node.js is a an **open-source, cross-platform** runtime environment, built upon Google Chrome's V8 JavaScript engine. Some advantages of using Node.js are:

1. **Speed** - the V8 JavaScript engine compiles JavaScript to native machine code before execution, using just-in-time (JIT) compilation. This is noticeably faster than using an interpreter or compiling it to intermediate code or bytecode.
2. **Asynchronous** - traditionally I/O is handled synchronously. For example if we had something like this
```
readFile(fileName);
queryDb(dbUrl);
httpPost(url);
```
Each function call would be a **blocking** call. Which means that the program would halt execution until the function until the read/query/HTTP request completes, which results in lost time!

    With Node.js, these I/O operations are **non-blocking**, which means that other portions of the program can execute while the I/O operation is in progress, saving much needed time!
3. **Single-threaded and event-driven** - Node.js is single-threaded, which may seem like a disadvantage at first. But in combination with Node.js's event-driven paradigm and scheduling of asynchronous operations with its event loop, it becomes highly scalable and efficient.
4. **npm** - the npm package repository is the largest code registry in the world. Which means that there is a package for almost every kind of functionality you could imagine. npm also makes installing node packages and integrating it with your project a breeze. More recently, npm is becoming the package manager of choice for both back-end and front-end resources.

### 2. Building your first HTTP server!

Now onto the fun part! Here's is the code for a basic Node HTTP server:

``` js

//server.js
//Author: Rutgers IEEE ISN Team

//Comments are just like single like comments in Java/C/C++

/*
 * or you can do multiline comments
 * like this!
 */

//Use require to import modules into your program
var http = require("http");
var port = process.env.PORT || 8080;

//Functions are first-class objects, you can treat them as variables
//and even pass them around as inputs to other functions
function requestHandler(req, res) {
    console.log(req.url);
    //Write the following text to the response
    res.end("My first Node.js server!");
}

//Create the server with the request handler function, it is invoked every
//time a request hits the server. Use this to illustrate callbacks
var server = http.createServer(requestHandler);

//Listen on port number for incoming connections
server.listen(port, function(err) {
    //Callback to check for error
    if (err) return console.log("Oh no! Something blew up!", err);

    console.log("Server is listening on port " + port + "!");
});

```

This is relatively simple, but as our application grows, we want to use a framework to ease further development.

### 3. Using Express.js

Express.js is a web framework that makes setting up a web application that makes adding features such as middleware (explained later) and API routes much easier. You can learn more about Express.js [here](http://expressjs.com/).

We can install Express.js using npm! Use the following command: `npm install express`. Now we are able to use Express.js in our application.

``` js
//server-express.js
//Author: Rutgers IEEE ISN Team

//Can import npm modules using same require syntax
var express = require("express");
//Initialize express application
var app = express();

var port = process.env.PORT || 8080;

//Instead of manually checking for URL, you can use HTTP verbs to define the
//application's routing
app.get("/", function(req, res) {
    res.send("My first Express server!");
});

//Listen for connections on port
app.listen(port, function(err) {
    //Callback to check for error
    if (err) return console.log("Oh no! Something blew up!", err);

    console.log("Server is listening on port " + port + "!");
});

```

#### A little bit about middleware

One of the most powerful features of Express is the ease of making and adding middleware functions.
Similar to Unix pipelines, middleware are functions that can modify the HTTP request and response, end the request
response cycle, or call the next middleware in the stack. This is useful for ensuring user authentication, maintaning account sessions,
and implementing other functionality in the future.

Let's try to implement some of our own middleware:

Let's make a time stamper that gives the time the page is requested! Also,
we'll add a simple random number generator.

``` js
...
//All middleware functions take the same three parameters
function requestTime(req, res, next) {
    req.requestTime = Date.now();
    //Always remember to include this to call the next middleware in the stack
    next();
}

function randomNumber(req, res, next) {
    req.randomNumber = Math.random();
    next();
}

...

//Add the middleware to the application (order matters a lot!)
app.use(requestTime);
app.use(randomNumber);

```

There is a special kind of middleware you can use for error handling, it takes four parameters. Let's write a simple one:

``` js

function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).send("Something blew up!");
}

...

//Make sure that this is the last middleware added to your application
app.use(errorHandler);
```

### 4. npm and Package Management

You saw earlier that we used npm to install Express.js. But what if we wanted to keep track of all our
package dependencies without having to distribute all of the dependencies with the application. Thankfully,
through a file called `package.json`, we can manage all our dependencies and give more information about the project.

There are two ways to make one. You can either write it manually or initialize it using `npm init` command. Let's use the second option.

Run through the command line instructions which look like the following:

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (Week 1)


```

At the end of this installation, we have a `package.json` file created with some information.

```
{
  "name": "basic-server",
  "version": "1.0.0",
  "description": "A basic tutorial to illustrate Node.js and Express.js.",
  "main": "server-express.js",
  "dependencies": {
    "express": "^4.14.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "Rutgers ISN Team",
  "license": "ISC"
}
```

There are three fields that are of importance for this workshop: `dependencies` are the
project dependencies necessary for the program's operation. `devDependencies` are project
dependencies not directly tied to the program's operation, such as linters, build tools, testing
frameworks, etc. `scripts` are wrappers for whatever utility functions you want to run. I personally do not use
them and use a separate task runner instead, but some people like to use these. You can run these scripts
using `npm [script-name]`.

#### Installing packages (the right way!)

Earlier	you	saw	that we	used `npm install express`. While this command works perfectly
fine, it doesn’t update	the	`package.json` file with your dependency. In order to
do so, this command is preferred: `npm install --save express` or `npm install -S
express`. This not only installs the Express.js module, but it adds express as a
dependency to your `package.json`. Installing `devDependencies` like `gulp` is similar:
`npm install --save-dev gulp` or `npm install -D gulp`. Sometimes we want to have
a package installed in the global scope	so we can access it	anywhere. We can do
this easily with npm! Let's install `nodemon`. `nodemon` is a package that automatically
restarts the server whenever we make a change to the application files. This will
automatically refresh the page to reflect the change. We want to access it from
the	command	line, so let’s install it globally. `npm install -g nodemon`.
