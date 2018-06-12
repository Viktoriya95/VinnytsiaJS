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
  res.render('authenticate');
});

router.post('/', function(req, res){
  // find the user
  userModel.findOne({name: req.body.name}, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({'message': 'Authentication failed. User not found.'});
    } else if (user) {
      var userPassword = user.password;
      // check if password matches
      if(!bcrypt.compareSync(req.body.password, userPassword)) {
        res.send({'message': 'Authentication failed. Wrong password.'});
      } else {
        const payload = {
          admin: user.admin,
          id: user.id
        };
        var token = jwt.sign(payload, config.secret, {
          expiresIn : 60*60*24 // expires in 24 hours
        });
        //var serialToken = JSON.stringify(token);
        //localStorage.setItem("token", serialToken);
        //var returnObj = JSON.parse(localStorage.getItem("myKey"))
        console.log(user);
        console.log(token);
        var userName = user.name;
        res.send({'token': token, 'userName': userName});
      }
    };
  })
})

module.exports = router;
