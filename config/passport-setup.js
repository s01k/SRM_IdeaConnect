const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys=require('./keys');
var name;

passport.serializeUser((user,done) => {
  done(null,name);
});

passport.deserializeUser((user,done) => {
  done(null,name);
});


passport.use(
  new GoogleStrategy({
  //options for the GoogleStrategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  //passport callback function
  name={name: profile.displayName,
        email: profile.emails[0].value,
        atoken: accessToken};
  done(null,name);
})
);
