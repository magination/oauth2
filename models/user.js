var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var promise  = require('bluebird');
promise.promisifyAll(bcrypt);

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, trim: true},
  username_lower: {type: String, required: true, unique: true, trim: true},
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},
  updateEmailToken: {type: String},
  updateEmailExpires: {type: Date},
  updateEmailTmp: {type: String},
  confirmEmailToken: {type: String},
  confirmEmailExpires: {type: Date},
  privileges: {type: Number, default: 0, min: 0, max: 2},
  numberOfAllowedPictures: {type: Number, default: 20},
  isConfirmed: {type: Boolean, default: false},
  isBanned: {type: Boolean, default: false},
  pieces: {
    singles: {type: Number, default: 0, min: 0},
    doubles: {type: Number, default: 0, min: 0},
    triples: {type: Number, default: 0, min: 0}
  },
  images: [String],
  isAdmin: {type: Boolean, required: true, default: false}
});

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
