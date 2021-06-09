const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');
const domainRoutes = require('./routes/domain-route');
var auth = "Log In";
var usern;
var link = '/auth';

app.use(express.static("public"));
app.use('/auth', express.static("public"));
app.use('/portal', express.static("public"));
app.use('/pdf', express.static(__dirname + '/public'));
const authCheck = (req, res, next) => {
    if (req.user) {
        res.redirect('/portal');
    } else {
        next();
    }
};


app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 10 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passportSetup

app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth', authRoutes);
// app.use('/portal', profileRoutes);
app.get('/portal', (req,res)=>{
    res.redirect('https://tinyurl.com/ideaconnect-proposals');
});
app.use('/domain', domainRoutes);
app.get('/', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('home', { auth: auth, user: usern, link: link });
});

//ABOUT
app.get('/missionvission', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('mvission', { auth: auth, user: usern, link: link });
});
app.get('/ulinks', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('uselinks', { auth: auth, user: usern, link: link });
});

//current proposal
app.get('/currentProposal', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('currentProposals', { auth: auth, user: usern, link: link });
});

app.get('/researchlab', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('researchlab', { auth: auth, user: usern, link: link });
});



app.get('/contact', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('contact', { auth: auth, user: usern, link: link });
});

app.get('/domains', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('about', { auth: auth, user: usern, link: link });
});

app.get('/resources', function(req, res) {
    if (req.user) {
        auth = 'Logout';
        usern = req.user.name;
        usern = 'Hello, ' + usern;
        link = '/auth/logout';
    } else {
        auth = 'Login';
        usern = '';
        usern = '';
        link = '/auth';
    }
    res.render('about', { auth: auth, user: usern, link: link });
});

app.listen(8080, () => {
    console.log(8080);
});
