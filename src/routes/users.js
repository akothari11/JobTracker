import Router from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

const User = mongoose.model('Users');
const router = Router();

router.get('/', (req, res) => {
  //return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
  //return res.send(req.context.models.users[req.params.userId]);
});

router.post('/register', (req, res) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({error: err, email: 'duplicate'});
    }

    const token = user.generateJwt();
    res.status(200);
    return res.send(token);
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', function(err, user, info){

    // Handle error from passport
    if (err) {
      return res.status(500).json(err);
    }

    // If a user is found
    if(user){
      const token = user.generateJwt();
      res.status(200);
      return res.send(token);
    } else {
      return res.status(500).send(info);
    }
  })(req, res);
});

export default router;