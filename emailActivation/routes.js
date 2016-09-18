var router  = new require('express').Router();
var controllers =  require('./controllers');
var user = require('../models/user');

router.get('/:token', function(req, res) {
  controllers.activate(req, res, req.params.token)
  .then(()=>{
    req.flash('success', 'Email activated');
    res.render('activation');
  })
  .catch((err) => {
    req.flash('error', err);
    res.render('activation');
  })
});

module.exports = router;
