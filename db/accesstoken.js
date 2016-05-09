var mongoose = require('mongoose');

var accesstokenSchema = new mongoose.Schema({
  token: {type: String, required: true, unique: true},
  userId: {type: String, required: true},
  clientId: {type: String, required: true}
})

module.exports = mongoose.model('accesstoken', accesstokenSchema);

/*var tokens = {}; 


exports.find = function(key, done) {
  var token = tokens[key];
  return done(null, token);
};

exports.save = function(token, userID, clientID, done) {
  tokens[token] = { userID: userID, clientID: clientID };
  return done(null);
};
*/
