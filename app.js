var config = require('./oauth.js');
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');




// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
         clientID: config.facebook.clientID,
         clientSecret: config.facebook.clientSecret,
         callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
         process.nextTick(function () {
           return done(null, profile);
         });
    }
));

passport.use(new TwitterStrategy({
     consumerKey: config.twitter.consumerKey,
     consumerSecret: config.twitter.consumerSecret,
     callbackURL: config.twitter.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
         process.nextTick(function () {
           return done(null, profile);
         });
    }
));

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ secret :'my_precious'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/users', users);


app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){
    });

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
     res.redirect('/users');
    });


app.get('/auth/twitter',
    passport.authenticate('twitter'),
    function(req, res){
    });

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
        console.log(req);
     res.redirect('/users');
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}