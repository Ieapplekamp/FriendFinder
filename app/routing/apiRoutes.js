// var express = require("express");
// var path = require("path");

var friendData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        return res.json(friendData);
    });
    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        friendData.push(newFriend);
        res.json(newFriend);
    });
};

// Should have 
// A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.