
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { db } from './src/models';
import passport from 'passport';
import routes from './src/routes';
import passportlocal from 'passport-local';
import mongoose from 'mongoose';

const app = express();
const distDir = __dirname + "/dist/";
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
        message: 'Invalid email or password'
      });
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Invalid email or password'
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}
));

app.use(express.static(distDir));
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
app.use('/api/users', routes.users);
app.use('/api/jobs', routes.jobs);
app.get('*', (req, res) => {

  res.sendFile(distDir + 'index.html');
});
db().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`app listening on port ${process.env.PORT}`)
  );
});
