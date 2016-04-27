var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Post = require("../models/post");


router.get('/', function(req, res, next) {
    
    Post.find({},{}, function(err, posts){
      if(err){
        console.log(err);
      }else{
        
         res.render('blog',{
			"posts": posts
		}); 
      }	
	});  
});


module.exports = router;