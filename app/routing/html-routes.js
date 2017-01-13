// html routes

var path = require("path");

module.exports = function (app) {

    app.get("/", function (request, response){
        console.log("server hit on '/'");
        response.sendFile(path.join(__dirname, "./../public/home.html"))
    });

    app.get("/survey", function (request, response){
        console.log("server hit on '/survey'");
        response.sendFile(path.join(__dirname, "./../public/survey.html"))
    });

    // app.use(function (request, response){
    //      console.log("server hit on 'app.use'");
    //     response.sendFile(path.join(__dirname, "./app/public/home.html"))
    // });
};
