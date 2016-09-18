/**
 * Module dependencies.
 */
var passport  = require('passport'),
    User      = require('./models/user'),
    activationRequest = require('./emailActivation/controllers').request,
    bcrypt   = require('bcrypt');


exports.info = [
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    // var scope = req.authInfo.scope;
    res.json({ user_id: req.user.id, username: req.user.username, name: req.user.username, email: req.user.email, isAdmin: req.user.isAdmin, scope: req.authInfo.scope })
  }
]

exports.create = function (req, res) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    req.flash('error', 'You need to fill in username, password and email');
    return res.render('register');
  }

  User.findOne({
    $or: [
      {username: req.body.username},
      {email: req.body.email}
    ]
  }, function (err, user) {
    if (err) {
      req.flash('error', 'Something went wrong, try again later');
      return res.redirect('/register');
    } else if (user) {
      req.flash('error', 'Username or email already in use, try something else');
      return res.redirect('/register');
    }

    bcrypt.hash(req.body.password, 8, function(err, hash) {
      if (err) {
        req.flash('error', 'Something went wrong, try again later');
        return res.render('register');
      }

      user = new User({
        username: req.body.username,
        username_lower: req.body.username.toLowerCase(),
        password: hash,
        email: req.body.email,
        isAdmin: false
      });

      user.save(function(err, user) {
        if (err) {
          req.flash('error', 'Something went wrong, try again later');
          return res.render('register');
        }

        activationRequest(req, res, user._id)
          .then(()=>{
            req.flash('success', 'User created, please confirm email');
            return req.query.redirect ? res.redirect(req.query.redirect) : res.render('login');
          })
          .catch((err)=>{
            req.flash('error', err);
            return res.render('register');
          });
      });
    });

  });
};
