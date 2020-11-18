const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {

  // res.sendFile(path.join(__dirname, './public/index.html'));
  res.render('homepage');
        
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('homepage');
  });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/chat/room', (req, res) => {
  res.render('chat');
})

module.exports = router;