var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var massive_string;

var twitter = require('twitter');
var config = require('./config.json');
var client = new twitter(config.twitter);
var twit_texts;
var text2;
var num;

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/add');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');

var app = express();

var text = "";
fs.open('log.csv', "r+", 0644, function(err, file_handle) {
  	if (!err) {
      fs.readFile('log.csv', function (err, contents) {
        text = contents.toString();
        //console.log(text);
  	})} else {
  		  text = '';
    }
    //fs.close();
  });

//console.log(text + "text");

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
  massive_string = {name: req.body.name.toString(),
      email: req.body.email.toString(),
      twitterAccount: req.body.twitterAccount.toString(),
      password: req.body.password.toString(),
      confirmPassword: req.body.confirmPassword.toString()};
  text2 = "Hello " + massive_string.name + " " + massive_string.twitterAccount + "! Your id is ";
  var string = () => {
    if(massive_string!=''){
      for(key in massive_string){
          text += (key + ": " + massive_string[key] + '\n');
      }
      text += '\n';
      massive_string = '';
      return text;
    }else {
      return text;
    }
  }
  fs.open("log.csv", "w+", 0644, function(err, file_handle) {
   if (!err) {
       fs.write(file_handle, string(), null, 'ascii', function(err, written) {
         if (!err) {
            num = (string().split('\n').length-1)/6;
            console.log(num + "num");
            text2 += num;
            console.log("Текст успешно записан в файл");
            /*router.get('/', function(req, res, next){
              console.log("text");
              var params = {screen_name: 'nodejs'};
              client.post('statuses/update', {status: "text2"},  function(error, tweet, response) {
                if(error) throw error;
                console.log(tweet);  // Tweet body.
                console.log(response);  // Raw response object.
              });
            });*/
            client.post('statuses/update', {status: text2},  function(error, tweet, response) {
              if(error) throw error;
              console.log(tweet);  // Tweet body.
              console.log(response);  // Raw response object
            });
            res.redirect('/register');
            //fs.close();
            //res.end();
        } else {
            console.log("Произошла ошибка при записи");
        }
    });}})
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
