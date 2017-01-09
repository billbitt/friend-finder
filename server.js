const express = require("express"); //needs npm install 
const bodParser = require("body-parser");  //needs npm install
const path = require('path');  //built in to node

const app = express();

var PORT = 3000;

//set up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("public"));  //what does this do?

//Server Routes
//...

//api Routes
//...

//open port to listen 
app.listen(PORT, function(){
    console.log("Server up on port:", PORT);
}
