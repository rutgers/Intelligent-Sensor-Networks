//tweet.js
//Author: Rutgers ISN Team

var twitter = require("twitter");

//Account Twitter handle
var twitterHandle = "@tesselproject";
//Account credentials
var credentials = {
    consumer_key: "O7oc0pvsZn4xjgcuHuYdX4FaC",
    consumer_secret: "iJYuHFz2sD46Nvk3mcwzX8uih14aEAMgVWdWoR59nx8v6Zl7ZX",
    access_token_key: "2529232909-luARGU89K4CKFMvfzBjCgG6ubefzDkdDWkSB85i",
    access_token_secret: "GXQfuzvGdjLEs3t1HEYfhQ9x9bdBcSBVXjBkbRgwYlOE0"
};
// The status to tweet
var status = "Hello from the Rutgers ISN team (for the second time)!." +
    "This is your #Tessel 2 speaking.";

// These OAuth credentials are for the dummy @TesselTweet account
var twit = new twitter(credentials);

// Make a tweet!
twit.post("statuses/update", {
    status: status
}, function(error, tweet, response) {
    if (error) console.log("error sending tweet:", error);
    else console.log("Successfully tweeted! Tweet text:", tweet.text);
});
