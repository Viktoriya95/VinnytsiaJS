var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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