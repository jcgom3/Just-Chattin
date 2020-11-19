const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {

  if (req.session.loggedIn){
    res.render('selectRoom',{
      // paste room to be rendered here
      loggedIn: req.session.loggedIn
    });
  }
  else res.redirect('/login');
        
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
  if (req.session.loggedIn){
    res.render('chat');
  }
  else res.redirect('/login');
  
  // console.log(req.session);
})

module.exports = router;