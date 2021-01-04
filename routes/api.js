const express = require('express');
const router = express.Router();

const TodoPost = require('../models/todoPost');
//routes
router.get('/', (req, res) =>{

    TodoPost.find({}).then((data)=>{
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ', error)
    })
    
});

router.get('/:id', (req, res) =>{
    TodoPost.findById(req.params.id).then((data)=>{
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ', error)
    })  
});

router.post('/save', (req, res) =>{
   
   console.log('Body : ' , req.body);
    const data = req.body;
    const newTodoPost = new TodoPost(data);
    newTodoPost.save((error)=>{
        if(error){
            res.statusCode(500).json({msg : "Sorry, internal server error"});
            return;
        }
    res.json({msg: 'We received your data!!!'}); 
    })
});


router.delete("/delete/:id", (req, res) => {
    TodoPost.findByIdAndDelete(req.params.id)
      .then(() => res.json("Event deleted."))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.put('/todos/:id',(req, res) => {

    TodoPost.findByIdAndUpdate(req.params.id, {title: req.body.title, body: req.body.body} ,//info updated
                //info updated
                function (err, obj) {
        if (err) return console.error(err);
        else {
            if (obj.n === 0) {
                res.send('id not found')
            } else {
                res.send('todo updated')
            }
        }
    })
})

module.exports = router;