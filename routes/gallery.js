var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');
var multerMiddleware = require("../middlewares/multer");

var Gallery = require("../models/gallery");

/* GET users listing. */
router.get('/', function(req, res, next) {
    
  Gallery.find({},{}, function(err, photos){
      if(err){
        console.log(err);
      }else{
        
         res.render('gallery',{
			"photos":photos
		}); 
      }	
	});  
});

/* GET users listing. */
router.get('/add',isLoggedIn, function(req, res, next) {
    
  Gallery.find({},{}, function(err, photos){
      if(err){
        console.log(err);
      }else{
        
         res.render('addGallery',{
			
		}); 
      }	
	});  
});

router.post('/add', multerMiddleware.single('mainImageName'), function(req, res, next){
	// Get Form Values
	var title 		= req.body.title;
	var category 	= req.body.category;
	var date 		= new Date();
    var monthNames  = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var month       = monthNames[date.getMonth()];

      var mainImageName 			= req.file['filename'] ;
      var mainImageOriginalName 	= req.file['originalname'];
	  var mainImageMime 			= req.file['mimetype'];
	  var mainImagePath 			= req.file['path'];
	  var mainImageSize 			= req.file['size'];
	

    newGallery = {
        title: title,
        category: category,
        date: date,
        month: month,
        mainImageName: mainImageName,
        mainImageOriginalName: mainImageOriginalName
    }
    
   
    Gallery.create(newGallery,function(err, ok){
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
