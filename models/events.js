
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var eventSchema = new mongoose.Schema({

    title : String,
    location : String,
    date : Date ,
    month : String,
    hour: String,
    body: String,
    mainImageName : String,
        
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Events', eventSchema);