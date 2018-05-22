var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const User = require('./Models/userSchema.js');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://User3:test@brainbasketcheckin-h7hkk.mongodb.net/checkin");
const db = mongoose.connection;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const userModel = db.model('test_users', User);
var token;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var secretRouter = require('./routes/secret');
var authenticateRouter = require('./routes/authenticate');
//var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/secret', secretRouter);
app.use('/authenticate', authenticateRouter);
//app.use('/register', registerRouter);

/*app.use('/', function(req, res) {
  res.render('index');
});*/

app.post('/authenticate', function(req, res){
  // find the user
  userModel.findOne({name: req.body.name}, function(err, user) {
  if (err) throw err;
  if (!user) {
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  } else if (user) {
    // check if password matches
    if (user.password != req.body.password) {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    } else {
      // if user is found and password is right
      // create a token with only our given payload
  // we don't want to pass in the entire user since that has the password
  const payload = {
    admin: user.admin 
  };
      token = jwt.sign(payload, config.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
      });
      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }   
  }
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.locals.message = 'some error text';
  res.render('404');
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
