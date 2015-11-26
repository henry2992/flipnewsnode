var path = require('path');
var express = require('express');
var router = express.Router();

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
        res.render('profile', { user: req.user });
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

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    return  router;
};