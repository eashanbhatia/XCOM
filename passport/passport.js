const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const hackUsers = require('../model/user');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local');




passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4444/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    let user = await hackUsers.findOne({ google_id: profile.id });
    try {
      if (user) return cb(null, user);
      user = await hackUsers.create({
        username: profile.displayName,
        google_id: profile.id,
        google_img: profile.photos[0].value,
        google_accessToken: accessToken
      });
      return cb(null, user)
    }

    catch (err) {
      done(err);
    }
  }
));



passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      let user = await hackUsers.findOne({ username: username });
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return done(err);
        if (result) return done(null, user);
        return done(null, false);
      });

    }

    catch (err) {
      if (err) return done(err);
    }

  }

));


passport.serializeUser(function (user, done) {  //Mapping user to id
  done(null, user._id);    //Mongo DB mein id (_id) krkr save hoti hai
});

passport.deserializeUser(async function (id, done) {   //Mapping id to user
  try {
    let user = await hackUsers.findOne({ _id: id });
    if (user) return done(null, user)
    done(null, false)
  }
  catch (err) {
    done(err);
  }
});

module.exports = passport;