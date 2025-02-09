const express = require('express') 
const mongoose = require('mongoose') // npm install mongoose 
const app = express() 
const PORT = 3080 

mongoose.connect('mongodb://127.0.0.1:27017/expense-app-july24')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })

app.use(express.json())
const { Schema, model } = mongoose
const TaskSchema = new Schema({
  title: {
    type: String, 
    required: true
  },
  description:{
    type:String
  },
  status:{
    type:String,
    default:'pending'
     
  }
}, { timestamps: true })

const Task = model('Task', TaskSchema)
app.get('/GET1/tasks', (req, res) => {
    Task.find()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        })

})

app.post('/POST/tasks', (req, res) => {
    const body = req.body
    const categoryObj = new Task(body)
    categoryObj.save()
        .then((category) => {
            res.status(201).json(category)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})


/*app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findById(id)
    .then(task=>{
        if(task){
         res.status(404).json({message:"record not found"})
        }
        else{res.json(task)}
    })
    .catch((err)=>{
       res.status(500).json({error:'something went wrong'})
    })
       
})*/
app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id
    Task.findById(id)
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong!'})
    })
})


    app.put('/tasks/:id',(req,res)=>{
        const id=req.params.id
        const body=req.body
        Tasks.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        .then((category)=>{
            if(!category){
                res.status(404).json({error:"record not found"})}
                else{req.json(category)}
            })
            .catch((err)=>{
    res.json(err)
            })
    
     } )
     app.delete('/DELETE/tasks/:id',(req,res)=>{
        const id=req.params.id
        Tasks.findByIdAndDelete(id)
        .then((category)=>{
        if(!category){
            res.status(404).json({error:'record not found'})
        }
        else{
            res.json(category)
        }
        
        })
        .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
        })
        
        })
    
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})