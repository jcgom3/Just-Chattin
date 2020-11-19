const router = require('express').Router();
const { User, Room } = require('../../models');
// const withAuth = require('../../utils/auth');


router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(() => {
        res.json("User created");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // Find username in database
  User.findOne({
      where: {username: req.body.username}
  }).then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No user found'});
          return;
      }
      // Check password
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
          res.status(401).json({ message: 'Incorrect password!' });
          return;
      }

      // Save session to database
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      req.session.inRoom = [];
      req.session.save() ;
      res.json({ message: 'You are now logged in!' });
      
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})


module.exports = router;