var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var news = require('./routes/news');




var mongoose = require('mongoose');
//connection with database
mongoose.connect("mongodb://localhost/billingSystem")
//assign the mongoose connection to a variable
var db= mongoose.connection;
//verify the connection status with the database
db.on('error',console.error.bind(console,'connection error......!!!!!'));
db.once('open',function(){
  console.log("Connected to MongoDB successfully");
});

// view engine setup
app.set('views', path.join(__dirname, '../build'));

app.set("view engine", "ejs");
app.engine("html", require('ejs').renderFile);

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));


app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use('/', index);
app.use('/users', users);
app.use('/news', news);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
