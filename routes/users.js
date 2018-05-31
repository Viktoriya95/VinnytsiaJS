var express = require('express');
var router = express.Router();
const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('./../Models/userSchema.js');
mongoose.connect("mongodb+srv://User3:test@brainbasketcheckin-h7hkk.mongodb.net/checkin");
const db = mongoose.connection;
const userModel = db.model('test_users', User);
var passwordHash = require('password-hash');
var appRouter = require('./../app');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find({}, function (err, users) {
    console.log(users);
    var text_users = '';
    users.map((user) => {text_users += "name: " + user.name + "\n"
                                    + "email: " + user.email + "\n"
                                    + "twitter account: " + user.twitter_account + "\n"
                                    + "password: " + user.password + "\n" + '\n';});
    res.render('allUsers', { users: text_users });
    text_users = '';
  });
});

router.get('/add', function(req, res, next) {
  res.render('userAdd');
});

router.post('/add', function(req, res, next) {
  var hashedPassword = passwordHash.generate(req.body.password);
  let user = {
    admin: req.body.admin,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    twitter_account: req.body.twitterAccount
  }
  console.log(user);
  const newUser = new userModel(user);
  newUser.save(function(error, user){
     console.log(error, user)
  });
  userModel.findOne({user: user}, function(err, user) {
  if (err) throw err;
  if (!user) {
    res.json('User not found.');
  } else {
      const payload = {
        admin: user.admin
      };
      token = jwt.sign(payload, config.secret, {
        expiresIn : 60*60*24 // expires in 24 hours
      });
      //var serialToken = JSON.stringify(token);
      //localStorage.setItem("token", serialToken);
      //var returnObj = JSON.parse(localStorage.getItem("myKey"))
      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
  });
});

module.exports = router;
