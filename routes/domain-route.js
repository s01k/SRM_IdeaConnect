const router = require('express').Router();
const express = require('express');
const app = express();
const path = require('path');

const authCheck = (req,res,next) => {
  if(req.user){
    res.redirect('/portal');
  }
  else {
    next();
  }
};

router.get('/', (req,res) => {
  res.render('contact');
});

module.exports = router;
