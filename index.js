const express = require("express");
const routes = require("./routes/routes");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", routes.index);
app.get('/about', routes.about);

app.listen(3001);
