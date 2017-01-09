// html routes
app.use("/", function (request, response){
    response.sendFile(path.join(__dirname, "./app/public/home.html"))
});

app.get("/survey", function (request, response){
    response.sendFile(path.join(__dirname, "./app/public/survey.html"))
});