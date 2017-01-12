var express = require("express"); //needs npm install 
var bodyParser = require("body-parser");  //needs npm install
var path = require('path');  //built in to node

var app = express();

var PORT = 3000;

//set up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//app.use(express.static("public"));  //what does this do?

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
})

app.post("/api/friends", function(){
    console.log("server hit with 'post' on '/api/friends'");
    //take in form submisssions
    //compare the form submission to the friends already in the array
    //display a modal with the closest match
    //add the form submission to the friends array
})

//open port to listen 
app.listen(PORT, function(){
    console.log("Server up on port:", PORT);
});
