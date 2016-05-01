/**
 * Module dependencies.
 */
var express     = require('express'),
  passport      = require('passport'),
  oauth2        = require('./oauth2'),
  user          = require('./user'),
  util          = require('util'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  session       = require('express-session'),
  mongoose      = require('mongoose'),
  User          = require('./db/user'),
  router        = require('./routes');
  
mongoose.connect('mongodb://localhost/oauth2');

// Express configuration
  
var app = express();
app.set('view engine', 'jade');
//app.use(logger());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
/*
app.use(function(req, res, next) {
  console.log('-- session --');
  console.dir(req.session);
  //console.log(util.inspect(req.session, true, 3));
  console.log('-------------');
  next()
});
*/
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration

require('./auth');

app.use('/', router);

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
