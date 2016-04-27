var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});


router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('signupMessage')} );
});

// app.post('/signup', do all our passport stuff here);
router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
                                              
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
