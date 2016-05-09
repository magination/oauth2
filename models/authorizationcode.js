var mongoose = require('mongoose');

var authorizationcodesSchema = new mongoose.Schema({
  code: {type: String, required: true},
  clientId: {type: String, required: true},
  redirectURI: {type: String, required: true},
  userId: {type: String, required: true}
})

module.exports = mongoose.model('authorizationcodes', authorizationcodesSchema);
