var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');
var multerMiddleware = require("../middlewares/multer");

var Category = require("../models/category");
var Post = require("../models/post");



/* GET users listing. */
router.get('/add',isLoggedIn, function(req, res, next) {
    
  Category.find({},{}, function(err, categories){
      if(err){
        console.log(err);
      }else{
        
         res.render('addpost',{
			"categories": categories
		}); 
      }	
	});  
});

router.post('/add', multerMiddleware.single('mainImageName'), function(req, res, next){
	// Get Form Values
	var title 		= req.body.title;
	var category 	= req.body.category;
    var author 	    = req.body.author;
	var body 		= req.body.body;
	var date 		= new Date();
    
    
    var mainImageName 			= "noimage.png";
	var mainImageOriginalName 	= "";
	var mainImageMime 			= "";
	var mainImagePath 			= "";
	var mainImageSize 			= "";
    

    
    if( typeof req.file !== "undefined") {
      mainImageName 			= req.file['filename'] ;
      mainImageOriginalName 	= req.file['originalname'];
	  mainImageMime 			= req.file['mimetype'];
	  mainImagePath 			= req.file['path'];
	  mainImageSize 			= req.file['size'];
	}

    newPost = {
        title: title,
        category: category,
        author: author,
        body : body,
        date: date,
        mainImageName: mainImageName,
        mainImageOriginalName: mainImageOriginalName
    }
    
   
    Post.create(newPost,function(err, ok){
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
