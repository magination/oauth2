/* var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  clientId: {type: String, required: true, unique: true},
  clientSecret: {type: String, required: true}
})

module.exports = mongoose.model('client', clientSchema); */

var clients = [
    { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret' },
    { id: '2', name: 'Nodebb', clientId: 'abcde', clientSecret: 'ssh-secret' },
];


exports.find = function(id, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.id === id) {
      return done(null, client);
    }
  }
  return done(null, null);
};

exports.findByClientId = function(clientId, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.clientId === clientId) {
      return done(null, client);
    }
  }
  return done(null, null);
};
