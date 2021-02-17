const express = require("express");
const routes = require("./routes/routes");

const app = express();

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.get("/", routes.index);

app.listen(3001);
