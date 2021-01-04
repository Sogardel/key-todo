const mongoose = require('mongoose');


//schema
const Schema = mongoose.Schema;
const TodoPostSchema = new Schema({
    title : String,
    body : String,
    date : {
        type : String,
        default : Date.now()
    } 
});
//model
const TodoPost = mongoose.model('TodoPost', TodoPostSchema);

module.exports = TodoPost;