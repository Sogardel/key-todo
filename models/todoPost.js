const mongoose = require('mongoose');
const validator = require('mongoose-validator')


//schema
const Schema = mongoose.Schema;
const TodoPostSchema = new Schema({
    //title : String,
    title: {
        type: String,
        minlength:[5,'Minimun code length 5 characters'],
        maxlength: [6,'Maximum title length is 16 characters']
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