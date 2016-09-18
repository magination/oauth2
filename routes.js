/**
 * Module dependencies.
 */
var passport 	    = require('passport'),
    login 		    = require('connect-ensure-login'),
  	router 		    = require('express').Router(),
  	oauth2  	    = require('./oauth2'),
  	user          = require('./user'),
    userModel     = require('./models/user'),
    emailRoutes   = require('./emailActivation/routes'),
    sendAcitvationEmail = require('./emailActivation/controllers').request;


router.get('/dialog/authorize', oauth2.authorization);
//router.post('/dialog/authorize/decision', oauth2.decision);
router.post('/oauth/token', oauth2.token);

router.get('/api/userinfo', user.info);

router.get('/', function(req, res) {
  res.send('Magination authentication service');
});

router.get('/login', function(req, res) {
  return res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login' ,
  failureFlash: 'Invalid username and/or password,\nor email not verified'})
);

router.get('/register', function(req, res) {
	return res.render('register');
});

router.post('/register', function(req, res) {
  user.create(req, res);
});

router.get('/logout', function(req, res) {
  req.logout();
  return res.redirect(process.env.NODEBB);
});

router.get('/account', login.ensureLoggedIn(), function(req, res) {
  res.render('account', { user: req.user });
});

router.use('/activate', emailRoutes);

router.get('/registered', function(req, res) {
  res.render('registered');
})

router.post('/registered', function(req, res) {
  userModel.findOne({ email: req.body.email }, function(err, user) {
    if (err || !user) {
        req.flash('error', 'Something went wrong, try again later');
      res.render('registered');
    }

    sendAcitvationEmail(req, res, user._id)
    .then(()=>{
      req.flash('success', 'Email activated');
      res.render('registered');
    })
    .catch((err) => {
      req.flash('error', err);
      res.render('registered');
    })
  })
})

module.exports = router;
