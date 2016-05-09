var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  clientId: {type: String, required: true, unique: true},
  clientSecret: {type: String, required: true}
})

module.exports = mongoose.model('client', clientSchema);
