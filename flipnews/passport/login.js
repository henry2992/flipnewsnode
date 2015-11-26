var LocalStrategy   = require('passport-local').Strategy;
var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	passport.use('login', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
        function(req, email, password, done) {
            User.findOne({ 'email' : email },
                function(err, user) {
                    if (err) return done(err);
                    if (!user || !isValidPassword(user, password)){
                        console.log('Invalid email or password.');
                        return done(null, false, req.flash('failMessage', 'Invalid email or password.'));
                    }
                    return done(null, user);
                }
            );
        })
    );

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    
};