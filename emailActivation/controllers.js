var uuid      = require("uuid");
var sendEmail = require('./email');
var user 	    = require('../models/user');
var Promise   = require('bluebird');


var sendAcitvationEmail = (req, email, token) =>{
  var url = req.protocol + '://' + req.get('host');
  var link = url + '/activate/' + token;
  return sendEmail(email,'Activation',link);
};

exports.request = (req, res, userId) => new Promise((resolve, reject) => {
  var token = uuid.v4();
  user.findById(userId).exec((err, user)=>{
    if (!user || err){
      return reject('Something went wrong. Try again later');
    }
    sendAcitvationEmail(req, user.email, token);
    user.confirmEmailToken = token;
    user.save(resolve);
  });
});


exports.activate = (req, res, token) => new Promise((resolve, reject)=>{
  user.findOne({confirmEmailToken:token}).exec((err, user)=>{
    if (!user || err){
      return reject('Something went wrong. Try again later');
    }
    user.isConfirmed = true;
    user.confirmEmailToken = "";
    user.save(resolve);
  });
});
