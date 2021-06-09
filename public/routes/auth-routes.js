const router = require('express').Router();
const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
var auth = "Log In";

const authCheck = (req,res,next) => {
  if(req.user){
    res.redirect('/portal');
  }
  else {
    next();
  }
};

router.get('/',authCheck,(req,res) => {
  res.redirect('/auth/login');
});

//auth login
router.get('/login', authCheck, (req,res) => {
  res.render('login');
});

// auth with google
router.get('/google', authCheck, passport.authenticate('google',{
  scope: ['profile',
          'https://mail.google.com',
          'https://www.googleapis.com/auth/userinfo.email']
}));


//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res) =>{
  //res.send(req.user);
  res.redirect('/portal');
});

router.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/');
});

module.exports = router;
