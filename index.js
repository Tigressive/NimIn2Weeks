const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
app.use(cookieParser('whatever'));

app.use(expressSession({
  secret: 'whatever',
  saveUninitialized: true,
  resave:true
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.get("/", routes.index);
app.get('/about', routes.about);
app.post('/signup', urlencodedParser, routes.signupPost);
app.post('/login', urlencodedParser, routes.loginPost);
app.get('/logout',routes.logout);
app.patch('/updateGamesWon', routes.updateGamesWon)

app.listen(3001);
