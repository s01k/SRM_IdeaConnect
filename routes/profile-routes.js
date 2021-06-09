const router = require('express').Router();
var fs = require('fs');
var http = require('http');
var port = process.env.PORT || 3000;
var express=require('express');
var app = express();
var formidable = require('formidable');
var nodemailer = require('nodemailer');
var ejs=require('ejs');
var jaga=require('path');
var path;
var name;
var email;
var token;
var transporter;
var auth = "Login";
var link='/auth';

const authCheck = (req,res,next) => {
  if(!req.user){
    res.redirect('/auth/login');
  }
  else {
    next();
  }
};


app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

router.get('/', authCheck, (req, res) => {

  if(req.user){
    auth='Logout';
    usern=req.user.name;
    usern='Hello, '+usern;
    link='/auth/logout';
  }
  else {
    auth='Login';
    usern='';
    usern='';
    link='/auth';
  }
  Title=req.query.title;
  name=req.user.name
  email=req.user.email;
  token=req.user.atoken;

    transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      user: email,
      accessToken: token
    }
  });

  res.render('index' , {error: '',name: name,auth: auth, user:usern, link: link,title:Title});

});

router.post('/fileupload', authCheck, function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      path = files.filetoupload.path;
      filename=files.filetoupload.name;
      name=fields.name;
      roll=fields.roll;
      title=fields.title;
      mnum=fields.mnum;

      var mailOptions = {
        from: name+'<'+email+'>',
        to: 'testaccou371@gmail.com',
        subject: roll,
        html: '<b>Title: </b>'+title+'<br><b>'+'Name:</b> '+name+'<br><b>Registration Number: </b>'+roll+'<br><b>Mobile Number: </b>'+mnum,
        attachments: [
        {   // utf-8 string as an attachment
            filename: filename,
            path: path
        }
      ]
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.render('index' , {error: '*Error while sending',name: req.user.name,auth: auth, user:usern, link: link});
        }
        else {
          res.render('index' , {error: '*Proposal sent successfully',name: req.user.name, link:link,auth:auth,user:usern});
        }
      });

    });
});

router.get('/logout', (req, res) =>{
  res.redirect('/auth/logout');
});

module.exports = router;
