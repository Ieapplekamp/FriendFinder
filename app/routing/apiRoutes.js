var totalScore = 0
var bestScore = 100
var bestFriendID = 0

var friendsData = require("../data/friends.js");

// module.exports = function(app) {
//     app.get("/api/friends", function(req, res) {
//         return res.json(friendsData);
//     });
//     app.post("/api/friends", function(req, res) {
//         var newFriend = req.body;
//         friendsData.push(newFriend);
//         res.json(newFriend);
//     });
// };

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res){
        totalScore = 0;
        bestScore = 100;
        bestFriendID = 0;
        for (i = 0; i < req.body.scores.length; i ++){
            req.body.scores[i] = parseInt(req.body.scores[i])
        }
        newFriendsMatch(req.body)

        friendsData.push(req.body)
        
        res.send({
            bestFriendName: friendsData[bestFriendID].name,
            bestFriendPic: friendsData[bestFriendID].photo
        });
    })

}

function newFriendsMatch(newFriend){
        for (i = 0; i < friendsData.length; i ++){
            var j = 0
            totalScore = 0;
            for (j = 0; j < friendsData[i].scores.length; j ++){
                totalScore += Math.abs(friendsData[i].scores[j] - newFriend.scores[j])
            }
            if (j === 10 && totalScore < bestScore){
                bestScore = totalScore;
                bestFriendID = i;
            }
        }
}
