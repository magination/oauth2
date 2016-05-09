var mongoose = require('mongoose');

var accesstokensSchema = new mongoose.Schema({
  token: {type: String, required: true, unique: true},
  userId: {type: String, required: true},
  clientId: {type: String, required: true}
})

module.exports = mongoose.model('accesstokens', accesstokensSchema);
