import 'dotenv/config'
import express from "express";
import passport from 'passport';
import router from "./routes/index.js";
import mongoose from 'mongoose';
import session from 'express-session';
import initializePassport from './utils/passportInitialize.js';

const app = express();

// connect MongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use('/', router)

const PORT = process.env.NODE_ENV || 8000;

initializePassport();

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/home'
  }),
);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
})