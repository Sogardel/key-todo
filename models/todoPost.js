const mongoose = require('mongoose');
const validator = require('mongoose-validator')


//schema
const Schema = mongoose.Schema;
const TodoPostSchema = new Schema({
    //title : String,
    title: String,
    body : String,
    date : {
        type : String,
        default : Date.now()
    } 
});
//model
const TodoPost = mongoose.model('TodoPost', TodoPostSchema);

module.exports = TodoPost;