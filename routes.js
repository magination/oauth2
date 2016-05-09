/**
 * Module dependencies.
 */
var passport 	= require('passport'),
    login 		= require('connect-ensure-login'),
  	router 		= require('express').Router(),
  	oauth2  	= require('./oauth2'),
  	user 			= require('./user');


router.get('/dialog/authorize', oauth2.authorization);
//router.post('/dialog/authorize/decision', oauth2.decision);
router.post('/oauth/token', oauth2.token);

router.get('/api/userinfo', user.info);

router.get('/', function(req, res) {
  res.send('OAuth 2.0 Server');
});

router.get('/login', function(req, res) {
  return res.render('login');
});

router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

router.get('/register', function(req, res) {
	return res.render('register');
});

router.post('/register', function(req, res) {
  user.create(req, res);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/account', login.ensureLoggedIn(), function(req, res) {
  res.render('account', { user: req.user });
});

module.exports = router;
