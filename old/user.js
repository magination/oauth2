/**
 * Module dependencies.
 */
var passport = require('passport')

exports.info = [
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
  	console.log('Im in');
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    // var scope = req.authInfo.scope;
    res.json({ user_id: req.user.id, username: req.user.username, email: req.user.email, scope: req.authInfo.scope })
  }
]
