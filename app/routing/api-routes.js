// api routes
var path = require("path");

var friendsData = require("./../data/friends.js");

module.exports = function (app){

    app.get("/api/friends", function(request, response){
        console.log("server hit with 'get' on '/api/friends'");
        //display json of friend array
        response.json(friendsData);
    })

    app.post("/api/friends", function(request, response){
        console.log("server hit with 'post' on '/api/friends'");
        //--take in form submisssions
        var userObj = request.body;
        //ensure the scores are converted from strings into numbers
        for (var i = 0; i < userObj.scores.length; i++){
            userObj.scores[i] = parseInt(userObj.scores[i]);
        };
        var userScores = userObj.scores;

        //--compare the form submission to the friends already in the array
        //find the difference in score for all friends...
        var allDifferences = [];
        for (var i = 0; i < friendsData.length; i++){ //loop through all the friends
            var friendScores = friendsData[i].scores;
            var totalDifference = 0;
            for (var j = 0; j < friendScores.length; j++){  //for each friend, loop through all scores 
                var scoreDifference = Math.abs(friendScores[j] - userScores[j]);  //find the difference 
                totalDifference += scoreDifference; //add the difference to a running total 
            };
            allDifferences.push(totalDifference);  //push the total difference to the differences array 
        };
        //find the index of the friend with the smallest difference...
        var friendMatchIndex = 0;  //this will hold the index of the friend with best match, start with friend[0]
        var friendMatchDifference = allDifferences[0]; //this will hold the difference for the friend with best match, start with difference of friend[0]
        for (var i = 1; i < allDifferences.length; i++){ //loop through all the differences, starting with the second
            //update friendMatchIndex & FriendMatchDifference as appropriate...
            if (allDifferences[i] < friendMatchDifference){
                friendMatchIndex = i;
                friendMatchDifference = allDifferences[i];
            };
        };

        //--add the form submission to the friends array
        friendsData.push(userObj);

        //--send a response back to the client 
        var responseObject = {
            "status": "Your request has been received by the server",
            "name": friendsData[friendMatchIndex].name,
            "photoUrl": friendsData[friendMatchIndex].photo
        }
        response.json(responseObject);
    })
};