var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
var routes = require("./controllers/burger-controller");
app.use(routes);
app.listen(port, function (){
    console.log("Server listening on: http://localhost:" + port)
}); 
