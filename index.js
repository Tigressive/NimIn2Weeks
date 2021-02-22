const express = require("express");
const bodyParser = require('body-parser')
const routes = require("./routes/routes");
const dataRoutes = require('./routes/dataRoutes');

const app = express();
app.use(bodyParser.json())
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.get("/", routes.index);
app.post('/signup', dataRoutes.signupPost);

app.listen(3001);
