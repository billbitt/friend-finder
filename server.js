var express = require("express"); //note: needs npm install 
var bodyParser = require("body-parser");  //note: needs npm install
var path = require("path");  //note: built in to node

var app = express();

var PORT = 3000;

//set up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//html routes
require("./app/routing/html-routes.js")(app);

//api routes
require("./app/routing/api-routes.js")(app);


//open port to listen 
app.listen(PORT, function(){
    console.log("Server up on port:", PORT);
});
