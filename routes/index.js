var express = require('express');
var router = express.Router();
const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('./../Models/userSchema.js');
const Checkin = require('./../Models/checkinsSchema.js');
mongoose.connect("mongodb+srv://User3:test@brainbasketcheckin-h7hkk.mongodb.net/checkin");
const db = mongoose.connection;
const userModel = db.model('test_users', User);
const checkinModel = db.model('checkins', Checkin);
console.log(mongoose.connection.readyState);


/* GET home page. */
router.get('/', function(req, res, next) {
  
  // let user = {}

  const newCheckin = new checkinModel();

  // const newUser = new userModel(user);
  // newUser.save(function(error, user){
  //     console.log(error, user)
  // });

  // userModel.find({}, function (err, users) {
  //   console.log(users);
  //   res.render('index', { title: users });
  // });
  checkinModel.find({}, function (err, checkins) {
    //console.log(checkins[0].cord);
    //console.log(checkins);
    res.render('index', {checkins: checkins});
  });
});

module.exports = router;