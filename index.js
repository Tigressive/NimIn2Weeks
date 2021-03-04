const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.get("/", routes.index);
app.get('/about', routes.about);
app.post('/signup', routes.signupPost);
//app.post('/login', routes.loginPost);

app.listen(3001);
