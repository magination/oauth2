var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var promise  = require('bluebird');
promise.promisifyAll(bcrypt);

var users = [
    { id: '1', username: 'bob', password: 'secret', name: 'Bob Smith', email: 'bob@secret.com', isAdmin: false },
    { id: '2', username: 'joe', password: 'password', name: 'Joe Davis' }
];

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  // Should make it so I only use username and not name
  // name: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: false}
})

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 8, function(err, hash) {
    if (err) {
      console.log(err);
    }

    this.password = hash;
    next()
  }.bind(this));
});

userSchema.methods.validPassword = function(password) {
  return bcrypt
    .compareAsync(password, this.password)
    .then(function(result) {
      return result;
    });
};

module.exports = mongoose.model('user', userSchema);


/*exports.find = function(id, done) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.id === id) {
      return done(null, user);
    }
  }
  return done(null, null);
};

exports.findByUsername = function(username, done) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return done(null, user);
    }
  }
  return done(null, null);
};*/