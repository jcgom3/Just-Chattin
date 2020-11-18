const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {

  // res.sendFile(path.join(__dirname, './public/index.html'));
  res.render('selectRoom');
        
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/chat/:room', (req, res) => {
  res.render('chat');
  console.log(req.session);
})

module.exports = router;