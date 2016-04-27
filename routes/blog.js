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


router.get('/:id', function(req, res, next) {
    
    var id = req.params.id;
    
    Post.find({"_id": id}, function(err, post){
      if(err){
        console.log(err);
      }else{
        console.log(post);
         res.render('show',{
			"post": post[0]
		}); 
      }	
	});  
});


module.exports = router;