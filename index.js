const express = require("express");
const routes = require("./routes/routes");
const dataRoutes = require("./routes/dataRoutes");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", routes.index);
app.get('/about', routes.about);
app.post('/signup', bodyParser, dataRoutes.signupPost);
app.post('/login', bodyParser, dataRoutes.loginPost);

app.listen(3001);
