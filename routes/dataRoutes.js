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
    });
};

async function addUserToDb(user) {
    var newUser = new User(user);
    await newUser.save();
}

exports.loginPost = async (req, res) => {
    var body = req.body;

    var user = await User.findOne({ username: body.username });
    var valid = false;
    if (user) {
        valid = await bcrypt.compare(req.body.password, user.password);
    }
    if(user && valid)
    {
        req.session.username = user.username;


        res.redirect("/");
    } else {
        req.session.username = null;
       
    }
};
