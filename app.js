var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config.json');

var twitter = require('twitter');
var client = new twitter(config.twitter);

const dbName = 'expressTwitterMongo';
const mongoose = require('mongoose');
const User = require('./schema/userShema');
mongoose.connect(`${config.db.dbUrl}/${config.db.dbName}`);
const db = mongoose.connection;
const collection = db.collection('users');
const userModel = db.model('users', User);

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/add');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');

var app = express();
var text2;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/add', registrationRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);

app.post('/regist', function (req, res) {
  // req.body.title
  //var htm = req.body;
  //console.log(htm);
  text2 = "Hello, " + req.body.name.toString() + ", " + req.body.twitterAccount.toString() + "! Your id is ";

  const newUser = new userModel({
    name: req.body.name.toString(),
    email: req.body.email.toString(),
    twitterAccount: req.body.twitterAccount.toString(),
    password: req.body.password.toString(),
    confirmPassword: req.body.confirmPassword.toString()
  });
  newUser.save(function(error, user){
    console.log(error, user);
    const countDocuments = function(db, callback) {
        // Get the documents collection
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
          if(err) throw error;
          console.log("Found the following records");
          //console.log(docs)
          callback(docs);
        });
      }
    countDocuments(db, function(docs) {
        text2 += docs.length;
        client.post('statuses/update', {status: text2},  function(error, tweet, response) {
          if(error) throw error;
          console.log(text2);
          //console.log("Message is delivered!");
          //console.log(tweet);  // Tweet body.
          //console.log(response);  // Raw response object
        });
    });
  });

  //text2 = "";
  res.redirect('/register');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
