'use strict';

const passport = require('passport');

// import strategies
const {Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// import modules
const { User } = require('../user/user.model');
const { JWT_SECRET } = require('../config');

// Passport authentication strategies are used to define how authentication middleware works.
// For more on how Passport authentication works using strategies, see:
// http://www.passportjs.org/docs/configure/

// the localStrategy gets used while trying to access an Endpoint using a User + Password combination
const localStrategy = new LocalStrategy((username, password, passportVerify) => {
  let user;
  // Step 1:  Verify the username exists
  User.findOne({ username: username })
    .then(_user => {
      user = _user;
      if (!user) {
        // Step 2A:  If user is not found on the database, reject promise with an error
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      // Step 2B:  Compare the user's password against the stored password hash by running it against the same algorithm
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        // Step 3A:  If password doesn't match the stored password hash, reject promise with an error.
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      // Step 3B:  If authentication is successful, execute the passportVerify callback correctly.
      //  to learn more about how the passportVerify callback works, see:
      //  // http://www.passportjs.org/docs/configure/#verify-callback
      return passportVerify(null, user);
    })
    .catch(err => {
      // Step 4: If an error ocurred at any stage during the process, execute the passportVerify callback correctly.
      if (err.reason === 'LoginError') {
        return passportVerify(null, false, err.message);
      }
      return passportVerify(err, false);
    });
});


// The JwtStrategy gets used while trying to access an Endpoint using a JSON Web Token
const jwtStrategy = new JwtStrategy(
  {
      secretOrKey: JWT_SECRET,
      // Look for the JWT as a Bearer auth header
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      // Only allow HS256 tokens - the same as the ones we issue
      algorithms: ['HS256']
  },
    (token, done) => {
      done(null, token.user);
  }
);

const localPassportMiddleware = passport.authenticate('local', { session: false});
const jwtPassportMiddleWare = passport.authenticate('jwt', { session: false });

module.exports = {
  localStrategy, 
  jwtStrategy,
  localPassportMiddleware,
  jwtPassportMiddleWare 
};
