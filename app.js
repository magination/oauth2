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
  User          = require('./models/user'),
  router        = require('./routes');
  
mongoose.connect('mongodb://localhost/oauth2');

var store = new MongoDBStore(
  {
    uri: 'mongodb://localhost/oauth2',
    collection: 'mySessions'
  });
// Express configuration
  
var app = express();
app.set('view engine', 'jade');
app.use(express.static('views'));
//app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(cookieParser());
app.use(session({
  secret: 'this is dog',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: store
}));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

/*app.use(function(req, res, next) {
  console.log('-- session --');
  console.dir(req.session);
  //console.log(util.inspect(req.session, true, 3));
  console.log('-------------');
  next()
});*/

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration

require('./auth');

app.use('/', router);

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
