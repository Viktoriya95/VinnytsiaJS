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
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index');
})

router.get('/checkins', function(req, res, next) {

  // let user = {}

  //const newCheckin = new checkinModel();

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
    //res.render('index', {checkins: checkins});
    res.send( checkins );
  })
})

router.post('/addcheckin', function(req, res){
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
        console.log(decoded);
        var marker = req.body.marker;
        let checkin = {
          name: marker.name,
          place: marker.place,
          cord: {
          	lat:Number(marker.cord.lat),
          	lng:Number(marker.cord.lng)
          },
          description: marker.description,
          rating: Number(marker.rating)
        }
        console.log(checkin);
        const newCheckin = new checkinModel(checkin);
        newCheckin.save(function(error, checkin){
          console.log(error, checkin);
        });
        res.sendStatus(200);
      }
    });} else {
    // if there is no token
    // return an error
    res.send({'message': 'Only registered users can make checkins.'});
  }
})

module.exports = router;
