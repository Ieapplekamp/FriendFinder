var friendsData = require("../data/friends.js");
// fucking shoot me
module.exports = function (app) {
    // get the json
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });
    // post the friends data
    app.post("/api/friends", function (req, res) {
            
        var totalDifference = 0;
        
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        };
    
        var userData = req.body;
        var userScores = userData.scores;
    
        var x = userScores.map(function(item) {
            return parseInt(item, 10);
        });

        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: x
        };

        var sum = x.reduce((a, b) => a + b, 0);
    
        for (var i = 0; i < friendsData.length; i++) {
            
            totalDifference = 0;

            var bestMatchScore = friendsData[i].scores.reduce((a, b) => a + b, 0);
            console.log(bestMatchScore);
            
            totalDifference += Math.abs(sum - bestMatchScore);
            console.log('----' + totalDifference);

            if (totalDifference <= bestMatch.friendDifference) {

                bestMatch.name = friendsData[i].name;
                bestMatch.photo = friendsData[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        res.send({
            bestFriendName: bestMatch.name,
            bestFriendPic: bestMatch.photo
        });
        // console.log(bestMatch);
        friendsData.push(userData);
    });
};