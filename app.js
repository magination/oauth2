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
  MongoDBStore  = require('connect-mongodb-session')(session),
  flashMessage  = require('connect-flash')(),
  router        = require('./routes')
  User          = require('./models/user'),
  Bluebird      = require('bluebird');

require('dotenv').config();

mongoose.connect('mongodb://localhost/game');
mongoose.Promise = Bluebird;

var store = new MongoDBStore(
  {
    uri: 'mongodb://localhost/game',
    collection: 'mySessions'
  });

var app = express();

app.set('view engine', 'jade');
app.use(express.static('views'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET || 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: store
}));

app.use(flashMessage);
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

require('./auth');

app.use('/', router);

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
