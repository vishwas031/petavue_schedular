import passport from 'passport';
import oAuthStrategy from "passport-google-oauth20"
const GoogleStrategy = oAuthStrategy.Strategy;
import UserModel from '../models/user.js';

const initializePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL,
    scope: ['profile','email','https://www.googleapis.com/auth/calendar']
  },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value
      const existingUser = await UserModel.findOne({ email }).exec();
      if (existingUser) {
        console.log('User Logged In');
        return done(null, profile);
      }
      const newUser = new UserModel({
        email,
        accessToken,
        userId: profile.id
      });
      await newUser.save();
        console.log("User Registered")
      return done(null, profile);
    }));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
}

export default initializePassport