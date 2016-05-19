var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var asyncc = require('async');

var Post = require("../models/post");

var post= [];

var posts = [];


router.get('/', function(req, res, next) {
    
    Post.find({},{}, function(err, posts){
      if(err){
        console.log(err);
      }else{
          
          
        var cats = [];
        var months = [];
        var recentPosts = [];
          
          
        (function containsCat(){
            for (var i=0; i<= posts.length; i++){ 
                
              var arr = posts[i];
                
              for (var cat in arr){
                  
                   if(cat === "category"){
                       var value = arr[cat];
                       if(cats.indexOf(value)===-1){
                          cats.push(value);   
                       }


                   }    
              }                               
            }return cats;             
        })();
          
        (function containsMonth(){
            for (var i=0; i<= posts.length; i++){ 
                
              var arr = posts[i];
                             
              for (var mon in arr){
                  
                   if(mon === "month"){
                       
                       if(months.indexOf(arr["month"]) == -1){
                        
                           if(arr["month"] !== undefined){
                               months.push(arr["month"]);
                           }              
                       }                                         
                   }                    
              }                               
            }return months;                        
        })();
          
        (function recentMonths(){
            for (var i=posts.length; i+6>(posts.length); i--){ 
                if(posts[i] !== undefined){
                    recentPosts.push(posts[i]); 
                }  
                
                
            }return recentPosts;                        
        })();  
         
       
         res.render('blog',{
			"posts": posts,
             "cats": cats,
             "months": months,
             "recentPosts":recentPosts
		 }); 
      }	
	});  
});


router.get('/:id', function(req, res, next) {
    
    var id = req.params.id; 
    
    asyncc.parallel([
    function(callback){
        
        
         Post.find({},{}, function(err, posts){
          if(err){
            console.log(err);
          }else{ 
              
                var cats = [];
                var months = [];
                var recentPosts = [];


                (function containsCat(){
                    for (var i=0; i<= posts.length; i++){ 

                      var arr = posts[i];

                      for (var cat in arr){
                          
                           if(cat === "category"){
                               var value = arr[cat];
                               if(cats.indexOf(value)===-1){
                                  cats.push(value);   
                               }
                               
                                      
                           }    
                      }                               
                    }return cats;             
                })();

                (function containsMonth(){
                    for (var i=0; i<= posts.length; i++){ 

                      var arr = posts[i];

                      for (var mon in arr){

                           if(mon === "month"){

                               if(months.indexOf(arr["month"]) == -1){

                                   if(arr["month"] !== undefined){
                                       months.push(arr["month"]);
                                   }              
                               }                                         
                           }                    
                      }                               
                    }return months;                        
                })();

                (function recentMonths(){
                    for (var i=posts.length; i+6>(posts.length); i--){ 
                        if(posts[i] !== undefined){
                            recentPosts.push(posts[i]); 
                        }  


                    }return recentPosts;                        
                })(); 
              
            callback(null, posts,cats,months,recentPosts);
          }
        });
        
    },
    function(callback){
         Post.find({"_id": id}, function(err, post){
          if(err){
            console.log(err);
          }else{
              callback(null, post);
          }	
        });  
    }
    ],
    function(err, results){
           
            // res.send(results);
            res.render('show', {
                "posts": results[0],
                "post": results[1][0],
                "cats" : results[0][1],
                "months": results[0][2],
                "recentPosts": results[0][3]
                
            });
    });
      
});
    
    



router.get('/category/:category', function(req, res, next) {
    
    var category = req.params.category;
    console.log(category);
    
    
     asyncc.parallel([
        function(callback){

            Post.find({},{}, function(err, posts){
                if(err){
                    console.log(err);
                }else{  
                    
                    var cats = [];
                    var months = [];
                    var recentPosts = [];


                    (function containsCat(){
                        for (var i=0; i<= posts.length; i++){ 

                          var arr = posts[i];

                          for (var cat in arr){

                               if(cat === "category"){
                                   var value = arr[cat];
                                   if(cats.indexOf(value)===-1){
                                      cats.push(value);   
                                   }


                               }    
                          }                               
                        }return cats;             
                    })();

                    (function containsMonth(){
                        for (var i=0; i<= posts.length; i++){ 

                          var arr = posts[i];

                          for (var mon in arr){

                               if(mon === "month"){

                                   if(months.indexOf(arr["month"]) == -1){

                                       if(arr["month"] !== undefined){
                                           months.push(arr["month"]);
                                       }              
                                   }                                         
                               }                    
                          }                               
                        }return months;                        
                    })();

                    (function recentMonths(){
                        for (var i=posts.length; i+6>(posts.length); i--){ 
                            if(posts[i] !== undefined){
                                recentPosts.push(posts[i]); 
                            }  


                        }return recentPosts;                        
                    })(); 
                
                    callback(null, posts,cats,months,recentPosts);
                }
            });
        
    },
    function(callback){
         Post.find({"category": category}, function(err, resPosts){
          if(err){
            console.log(err);
          }else{
              callback(null, resPosts);
          }	
        });  
    }
    ],
    function(err, results){
            // res.send(results);
            res.render('categories', {
                "resPosts":results[1],
                "post": results[1][0],
                "cats" : results[0][1],
                "months": results[0][2],
                "recentPosts": results[0][3]
                
            });
    });
      
 
});

router.get('/date/:month', function(req, res, next) {
    
    var month = req.params.month;
    
    asyncc.parallel([
        function(callback){

            Post.find({},{}, function(err, posts){
                if(err){
                    console.log(err);
                }else{  
                    
                    var cats = [];
                    var months = [];
                    var recentPosts = [];


                    (function containsCat(){
                        for (var i=0; i<= posts.length; i++){ 

                          var arr = posts[i];

                          for (var cat in arr){

                               if(cat === "category"){
                                   var value = arr[cat];
                                   if(cats.indexOf(value)===-1){
                                      cats.push(value);   
                                   }


                               }    
                          }                               
                        }return cats;             
                    })();

                    (function containsMonth(){
                        for (var i=0; i<= posts.length; i++){ 

                          var arr = posts[i];

                          for (var mon in arr){

                               if(mon === "month"){

                                   if(months.indexOf(arr["month"]) == -1){

                                       if(arr["month"] !== undefined){
                                           months.push(arr["month"]);
                                       }              
                                   }                                         
                               }                    
                          }                               
                        }return months;                        
                    })();

                    (function recentMonths(){
                        for (var i=posts.length; i+6>(posts.length); i--){ 
                            if(posts[i] !== undefined){
                                recentPosts.push(posts[i]); 
                            }  


                        }return recentPosts;                        
                    })(); 
                
                    callback(null, posts,cats,months,recentPosts);
                }
            });
        
    },        
    function(callback){
         Post.find({"month": month}, function(err, resPosts){
          if(err){
            console.log(err);
          }else{
              callback(null, resPosts);
          }	
        });  
    }
    ],
    function(err, results){
            // res.send(results);
            res.render('categories', {
                "resPosts":results[1],
                "post": results[1][0],
                "cats" : results[0][1],
                "months": results[0][2],
                "recentPosts": results[0][3]
                
            });
    }); 
});


module.exports = router;