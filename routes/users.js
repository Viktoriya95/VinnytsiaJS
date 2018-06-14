var express = require('express');
var router = express.Router();
const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('./../Models/userSchema.js');
mongoose.connect("mongodb+srv://User3:test@brainbasketcheckin-h7hkk.mongodb.net/checkin");
const db = mongoose.connection;
const userModel = db.model('test_users', User);
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find({}, function (err, users) {
    //console.log(users);
    var text_users = '';
    users.map((user) => {text_users += "name: " + user.name + "\n"
                                    + "email: " + user.email + "\n"
                                    + "twitter account: " + user.twitter_account + "\n"
                                    + "password: " + user.password + '\n' + '\n';});
    res.render('allUsers', { users: text_users });
    text_users = '';
  });
});

router.get('/add', function(req, res, next) {
  res.render('userAdd');
});

router.get('/update', function(req, res, next) {
  res.render('userUpdate');
});

router.post('/add', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var password = req.body.password;
  var hash = bcrypt.hashSync(password, salt);
  let user = {
    admin: req.body.admin,
    name: req.body.name,
    email: req.body.email,
    password: hash,
    twitter_account: req.body.twitterAccount
  }
  //console.log(user);
  const newUser = new userModel(user);
  newUser.save(function(error, user){
    console.log(error, user);
    res.sendStatus(200);
  });
  res.sendStatus(200);
});

router.post('/remove', function(req, res){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.send({'message': 'Can\'t verify user.'});
      } else {
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;
        console.log(decoded.id);
        userModel.deleteOne({_id: decoded.id}, function(err, result){
        console.log(result);
        });
        res.sendStatus(200);
      }
    });} else {
    // if there is no token
    // return an error
    res.send({'message': 'You are not allowed to remove.'});
  }
})

router.post('/update',function(req, res){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var user = req.body.user;
  var hash;
  var email = user.email;
  var twitterAccount = user.twitterAccount;

  if(password){
    var salt = bcrypt.genSaltSync(10);
    var password = user.password;
    hash = bcrypt.hashSync(password, salt);
  }
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.send({'message': 'Can\'t verify user.'});
      } else {
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;
        console.log(decoded);
        if(email){
          userModel.updateOne({_id: decoded.id},
          { $set: {email: email}}, function(err, result){
              console.log(result);
            }
          );
        }
        if(hash){
          userModel.updateOne({_id: decoded.id},
          { $set: {password: hash}}, function(err, result){
              console.log(result);
            }
          );
        }
        if(twitterAccount){
          userModel.updateOne({_id: decoded.id},
          { $set: {twitter_account: twitterAccount}}, function(err, result){
              console.log(result);
            }
          );
        }
        res.sendStatus(200);
      }
    });} else {
    // if there is no token
    // return an error
    res.send({'message': 'You are not allowed to update.'});
  }
})

module.exports = router;
