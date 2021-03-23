const mongoose = require('mongoose');
const validator = require('mongoose-validator')


//schema
const Schema = mongoose.Schema;
const TodoPostSchema = new Schema({
    //title : String,
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 16
      },
    body : String,
    date : {
        type : String,
        default : Date.now()
    } 
});
//model
const TodoPost = mongoose.model('TodoPost', TodoPostSchema);

module.exports = TodoPost;