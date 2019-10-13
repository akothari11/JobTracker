
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { db } from './models';
import passport from 'passport';
import routes from './routes';
import bodyParser from 'body-parser';
import passportlocal from 'passport-local';
import mongoose from 'mongoose';

const app = express();
const __dirname = '/Users/anujkothari/JobStats/src/job-stats/src/'
const LocalStrategy = passportlocal.Strategy;
const User = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
function(username, password, done) {
  User.findOne({ email: username }, function (err, user) {
    if (err) { return done(err); }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}
));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});
app.use(passport.initialize());
app.use('/users', routes.users);
app.use('/jobs', routes.jobs);

db().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`app listening on port ${process.env.PORT}`)
  );
});
