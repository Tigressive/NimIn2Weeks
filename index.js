const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", routes.index);
app.get('/about', routes.about);
app.post('/signup', bodyParser, routes.signupPost);
//app.post('/login', routes.loginPost);

app.listen(3001);
