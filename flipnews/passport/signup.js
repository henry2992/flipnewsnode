var LocalStrategy   = require('passport-local').Strategy;
var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	passport.use('signup', new LocalStrategy({ passReqToCallback: true, usernameField: 'email', passwordField: 'password_' },
        function(req, email, password, done) {
            findOrCreateUser = function() {
                User.findOne({ 'email': email }, function(err, user) {
                    if (err) return done(err);
                    if (user) {
                        console.log('User already exists with email: ' + email);
                        return done(null, false, req.flash('failMessage', email + ' is already in use.'));
                    } else {
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = createHash(password);
                        newUser.save(function(err) {
                            if (err) throw err;
                            return done(null, newUser, req.flash('successMessage', 'User successfully registered.'));
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );

    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};