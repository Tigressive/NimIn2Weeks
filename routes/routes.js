const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



var connectionString = 'mongodb+srv://admin:admin@cluster0.c5trx.mongodb.net/test';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const userCollectionName = 'Users';
const saltRounds = 10;

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    gamesWon: Number
}, {collection: "Users"});

const User = mongoose.model(userCollectionName, UserSchema);

exports.signupPost = (req, res) => {    
    var body = req.body;
    console.log(body);

    // req.check('username', 'Username must be at least 6 characters').isLength({min : 6});

    bcrypt.hash(body.password, saltRounds, function(err, hash){
        var signupInput = {
            username: body.username, 
            password: hash,
            email: body.email,
            gamesWon: 0
        };
     
        addUserToDb(signupInput);
        res.sendfile("./public/login.html");
    });
};


exports.loginPost = async (req, res) => {
    var body = req.body;
    console.log(body);
    var user = await User.findOne({ username: body.username });
    var valid = false;
    if (user) {
        valid = await bcrypt.compare(req.body.password, user.password);
    }
    if(user && valid)
    {
        req.session.user = {
            isAuthenticated:true,
            username: user.username,
            gamesWon: user.gamesWon
        }

        console.log(req.session.user.username)
        res.sendfile("./public/index.html");
        
    } else {
       
        res.sendfile("./public/login.html");
    }
};
exports.updateGamesWon = (req, res) => {
    console.log("hello");
    User.find({"username": req.session.user.username}, (err, user) => {
        if (err) return console.error(err);
        user[0].gamesWon = req.body.gamesWon;
        console.log(user);
        user[0].save((err, user) => {
            if (err) return console.error(err);
            console.log(req.session.user.username + ' updated');
        });
    });
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
      if(err){
        console.log(err);
      } else {
        res.sendfile("./public/index.html")
      }
    })
  }

async function addUserToDb(user) {
    var newUser = new User(user);
    await newUser.save();
}


exports.index = (req, res) => {
    res.sendfile("./public/index.html");
};

exports.about = (req, res) => {
  res.sendfile("./public/about.html");
};
