/**
 * Module dependencies.
 */
var passport  = require('passport'),
    User      = require('./models/user');

exports.info = [
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    // var scope = req.authInfo.scope;
    res.json({ user_id: req.user.id, username: req.user.username, name: req.user.username, email: req.user.email, scope: req.authInfo.scope })
  }
]

exports.create = function(req, res) {
  console.log(req.body.callback);
  if (!req.body.username || !req.body.password || !req.body.email) {
    req.flash('error', 'You need to fill in username, password and email');
    return res.render('register');
  }

  User.findOne({
    $or: [
      {username: req.body.username},
      {email: req.body.email},
    ]
  }, function(err, user) {
    if (err) {
      req.flash('error', 'Something went wrong, try again later');
      return res.redirect('/register');
    } else if (user) {
      req.flash('error', 'Username or email already in use, try something else');
      return res.redirect('/register');
    }

    user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      isAdmin: false
    });

    user.save(function(err) {
      if (err) {
        req.flash('error', 'Something went wrong, try again later');
        return res.redirect('/register');
      }
    });

    req.flash('success', 'User created, log in here');
    return res.redirect(req.body.callback);
  });
}
