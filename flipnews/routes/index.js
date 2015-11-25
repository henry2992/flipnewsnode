var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index');
});

router.get('/signup.html', function(req, res, next) {
  res.render('signup');
});

router.get('/about.html', function(req, res, next) {
  res.render('about');
});

router.get('/profile.html', function(req, res, next) {
  res.render('profile');
});

module.exports = router;
