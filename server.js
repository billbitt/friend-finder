var express = require("express"); //note: needs npm install 
var bodyParser = require("body-parser");  //note: needs npm install
var path = require('path');  //note: built in to node

var friendsData = require('./friends');

var app = express();

var PORT = 3000;

//set up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("public"));  //what does this do?
//app.use(express.static("data")); 

//Server Routes
//...
app.get("/", function (request, response){
    console.log("server hit on '/'");
    response.sendFile(path.join(__dirname, "./app/public/home.html"))
});

app.get("/survey", function (request, response){
    console.log("server hit on '/survey'");
    response.sendFile(path.join(__dirname, "./app/public/survey.html"))
});

//api Routes
//...
app.get("/api/friends", function(request, response){
    console.log("server hit with 'get' on '/api/friends'");
    //display json of friend array
    response.json(friendsData);
})

app.post("/api/friends", function(request, response){
    console.log("server hit with 'post' on '/api/friends'");
    //--take in form submisssions
    var userObj = request.body;
    var userScores = userObj.scores;
    console.log("User scores:", userScores)

    //--compare the form submission to the friends already in the array
    //find the difference in score for all friends...
    var allDifferences = [];
    for (var i = 0; i < friendsData.length; i++){ //loop through all the friends
        var friendScores = friendsData[i].scores;
        var totalDifference = 0;
        console.log(friendsData[i].name, friendScores)
        for (var j = 0; j < friendScores.length; j++){  //for each friend, loop through all scores 
            var scoreDifference = Math.abs(friendScores[j] - userScores[j]);  //find the difference 
            totalDifference += scoreDifference; //add the difference to a running total 
        };
        allDifferences.push(totalDifference);  //push the total difference to the differences array 
    };
    //find the index of the friend with the smallest difference...
    var friendMatchIndex = 0;  //this will hold the index of the friend with best match, start with friend[0]
    var friendMatchDifference = allDifferences[0]; //this will hold the difference for the friend with best match, start with difference of friend[0]
    console.log("All differences:", allDifferences)
    for (var i = 1; i < allDifferences.length; i++){ //loop through all the differences, starting with the second
        //update friendMatchIndex & FriendMatchDifference as appropriate...
        if (allDifferences[i] < friendMatchDifference){
            friendMatchIndex = i;
            friendMatchDifference = allDifferences[i];
        };
    };

    //--display a modal with the closest match
    console.log("User's closest friend is:", friendsData[friendMatchIndex].name);
    console.log("User's friend's picture is available at:", friendsData[friendMatchIndex].photo);
    console.log("User's total difference from friend is:", friendMatchDifference);

    //--add the form submission to the friends array
    friendsData.push(userObj);

    //--send a response back to the client 
    response.send('Your request has been received by the server');
})

//open port to listen 
app.listen(PORT, function(){
    console.log("Server up on port:", PORT);
});
