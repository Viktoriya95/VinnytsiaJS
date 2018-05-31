var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://User3:test@brainbasketcheckin-h7hkk.mongodb.net/checkin");
const User = require('./Models/userSchema.js');
const db = mongoose.connection;
const userModel = db.model('test_users', User);
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.json'); // get our config file
var token;
var passwordHash = require('password-hash');

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
app.use('/users/add', usersRouter);
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
      var hashedPassword = '' + user.password + '';
      // check if password matches
      var password = '' + req.body.password + '';
      if (passwordHash.verify(password, hashedPassword) == true) {
        res.json({message: 'Authentication failed. Wrong password.'});
      } else {
        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.admin,
          id: user.id,
          name: user.name
        };
        token = jwt.sign(payload, config.secret, {
          expiresIn : 60*60*24 // expires in 24 hours
        });
        //var serialToken = JSON.stringify(token);
        //localStorage.setItem("token", serialToken);
        //var returnObj = JSON.parse(localStorage.getItem("token"))
        // return the information including token as JSON
        res.render('index', {token: token});
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
