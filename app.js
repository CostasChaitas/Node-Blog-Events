var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require("express-validator");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require("connect-flash");
var morgan = require('morgan');
var session = require('express-session');
var crypto = require('crypto');

var User = require("./models/user");

var routes = require('./routes/index');
var aboutus = require('./routes/aboutus');
var posts = require('./routes/posts');
var blog = require('./routes/blog');
var gallery = require('./routes/gallery');
var events = require('./routes/events');

var app = express();

require('./config/passport')(passport); // pass passport for configuration

//log every req to the console
app.use(morgan('dev'));

app.locals.moment = require("moment");

app.use(require('express-session')({
    secret: 'Testaki',
    resave: false ,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//connect-flash
app.use(flash());

app.use(function (req,res,next) {
	res.locals.currentUser = req.user;
    res.locals.messages = require('express-messages')(req, res);
   
	next();
});


//mongoose.connect("mongodb://localhost/voteapp");
mongoose.connect("mongodb://ras:rasakos1234@ds019491.mlab.com:19491/modal");





//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg ,value){
    var namespace = param.split(".")
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += "[" + namespace.shift() + "]";
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//this actually makes route of /upload and access uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/', routes);
app.use('/aboutus', aboutus);
app.use('/posts', posts);
app.use('/blog', blog);
app.use('/gallery', gallery);
app.use('/events', events);

/*

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

*/
module.exports = app;
