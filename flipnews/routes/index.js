var path = require('path');
var express = require('express');
var router = express.Router();
var helper = require('../passport/cryptHelper');
var User = require('../model/user');

function requireAuth(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('failMessage', 'You must be logged in to access this page.');
        res.redirect('/');
    } else next();
}

/*
 * This function will retrieve news from twitter (or from a dummy file)
 */
function getNews(req) {
    var filename = path.join(__dirname, '..', 'dummyData', 'news1.json');
    var url = 'http://' + req.headers.host;
    var fs = require('fs');
    var dummyData = JSON.parse(fs.readFileSync(filename));

    var len = dummyData.news.length;
    for (var i=0; i<len; i++) {
        var curr = dummyData.news[i];
        curr.image = curr.image.replace('#url', url);
        curr.source.image = curr.source.image.replace('#url', url);
    }
    
    return dummyData;
}

module.exports = function(passport) {

    router.get('/', function(req, res, next) {
        if (req.isAuthenticated())
            res.redirect('/app.html');
        else
            res.redirect('/index.html');
    });

    router.get('/index.html', function(req, res, next) {
        res.render('index', {
            failMessage: req.flash('failMessage'),
            successMessage: req.flash('successMessage')
        });
    });

    router.get('/signup.html', function(req, res, next) {
        res.render('signup', {
            failMessage: req.flash('failMessage'),
            successMessage: req.flash('successMessage')
        });
    });

    router.get('/about.html', function(req, res, next) {
      res.render('about');
    });

    router.get('/profile.html', requireAuth, function(req, res, next) {
        var user = User.findOne({ 'email': req.user.email }, function(err, user) {
            if (err) return done(err);
            res.render('profile', { user: req.user, profile: user });
        });
    });

    router.get('/app.html', requireAuth, function(req, res, next) {
        res.render('news', { user: req.user, news: getNews(req) });
    });

    router.get('/data', requireAuth, function(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.send(getNews(req));
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup.html',
        failureFlash : true
    }));

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/app.html',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.post('/updateProfile', requireAuth, function(req, res, next) {
        var email = req.user.email;
        var newName = req.body.name;
        var dob = req.body.dob;
        var newEmail = req.body.email;
        if (newEmail === '') newEmail = email;
        var newPassword = req.body.password;
        if (newPassword === '')
            newPassword = req.user.password;
        else
            newPassword = helper.createHash(newPassword);
        User.findOneAndUpdate(
            { 'email': email },
            { name: newName,
                email: newEmail,
                birthdate: dob,
                password: newPassword
            },
            { upsert: false,
                new: true
            },
            function(err, doc) {
                if (err) {
                    res.send({ failMessage: 'Error while trying to update profile.'});
                } else {
                    res.render('news', {
                        user: req.user,
                        news: getNews(req),
                        successMessage: 'Profile successfully updated.'
                    });
                }
            }
        );
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return  router;
};
