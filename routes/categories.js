var express = require('express');
var router = express.Router();
var mongoose   = require('mongoose');

var Category = require("../models/category");


/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('addcategory');
});

router.post('/add', function(req, res, next){
	// Get Form Values
    
    var category = new Category();
	category.title = req.body.title;
  

    category.save(function(err){
        if(err){
            console.log(err);
        }
        res.render('addcategory');
    });
   
});


module.exports = router;
