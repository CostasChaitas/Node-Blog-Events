// app/models/category.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var postSchema = new mongoose.Schema({

    title : String,
    category : String,
    author : String,
    body : String, 
    date : Date ,
    month : String,
    mainImageName : String,
    mainImageOriginalName: String
        
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Post', postSchema);