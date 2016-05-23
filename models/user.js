var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var promise  = require('bluebird');
promise.promisifyAll(bcrypt);

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
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
