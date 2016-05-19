var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');
var multerMiddleware = require("../middlewares/multer");

var Events = require("../models/events");

/* GET users listing. */
router.get('/', function(req, res, next) {
    
  Events.find({},{}, function(err, events){
      if(err){
        console.log(err);
      }else{
        
         res.render('events',{
			"events":events
		}); 
      }	
	});   
});

/* GET users listing. */
router.get('/add',isLoggedIn, function(req, res, next) {
    
  Events.find({},{}, function(err, events){
      if(err){
        console.log(err);
      }else{
        
         res.render('addEvent',{
			
		}); 
      }	
	});  
});


router.post('/add', multerMiddleware.single('mainImageName'), function(req, res, next){
	// Get Form Values
	var title 		= req.body.title;
	var location 	= req.body.location;
    var body 	= req.body.body;
	var date 		= req.body.date;


      var mainImageName 			= req.file['filename'] ;
      var mainImageOriginalName 	= req.file['originalname'];
	  var mainImageMime 			= req.file['mimetype'];
	  var mainImagePath 			= req.file['path'];
	  var mainImageSize 			= req.file['size'];
	

    newEvent = {
        title: title,
        location: location,
        body:body,
        date: date,
        mainImageName: mainImageName,
        mainImageOriginalName: mainImageOriginalName
    }
    
   
    Events.create(newEvent,function(err, ok){
        if(err){
            console.log(err);
            
        }else{
           
            console.log(ok);
            
            res.render('index', { message: req.flash('info') });
        }
    });
   
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
