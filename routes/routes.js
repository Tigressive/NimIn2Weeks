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
    email: String
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
            email: body.email
        };
        console.log("hello");
        addUserToDb(signupInput);
    });
};

async function addUserToDb(user) {
    console.log("poggers");
    var newUser = new User(user);
    await newUser.save();
}

exports.index = (req, res) => {
  res.render("index");
};

exports.about = (req, res) => {
  res.sendfile("./public/about.html");
};