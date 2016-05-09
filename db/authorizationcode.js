var mongoose = require('mongoose');

var authorizationcodesSchema = new mongoose.Schema({
  code: {type: String, required: true},
  clientId: {type: String, required: true},
  redirectURI: {type: String, required: true},
  userId: {type: String, required: true}
})

module.exports = mongoose.model('authorizationcodes', authorizationcodesSchema);

/*
var codes = {};


exports.find = function(key, done) {
  var code = codes[key];
  return done(null, code);
};

exports.save = function(code, clientID, redirectURI, userID, done) {
  codes[code] = { clientID: clientID, redirectURI: redirectURI, userID: userID };
  return done(null);
};

exports.delete = function(key, done) {
    delete codes[key];
    return done(null);
}
*/