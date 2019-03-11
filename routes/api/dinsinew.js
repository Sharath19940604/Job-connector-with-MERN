const express = require('express');
const router = express.Router();

const Dinsi = require('../../models/Dinsi');

router.get('/',(req,res) =>{
    Dinsi.find()
    .sort({date:-1})
    .then(dinsis => res.json(dinsis));
  //  console.log(dinsis());
});

router.post('/',(req,res) =>{
    const newItem = new Dinsi({
        name: req.body.name
    })
    newItem.save().then(dinsis => res.json(dinsis));
});

router.delete('/:id',(req,res)=>{
    Dinsi.findById(req.params.id)
        .then(dinsis => dinsis.remove().then(()=> res.json({
            success:true
        })))
        .catch(err => res.status(404).json({success:false}));
});

module.exports=router;