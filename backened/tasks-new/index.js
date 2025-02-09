const express = require('express')
const { checkSchema } = require('express-validator')
const mongoose = require('mongoose')
const port = 3015
const app = express()
app.use(express.json)

mongoose.connect('mongodb://127.0.0.1:27017/task-app')
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log('error connectiing to db ',err)
})

const {Schema, model} = mongoose
const taskSchema = new Schema(
    {title:{type:String,required:true}},
    {description:{type:String,required:true}},
    {status:{type:String,default:"pending"}},
    {timestamps:true})

const Task = model('Task',taskSchema)
const taskValidationSchema={
    title:{
        in:['body'],
        exists:{
            errorMessage:'title field is required'
        },
        notEmpty:{
                 errorMessage:'title cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'title should be in between 3 to 20 charcters'
        }
    },

    description:{
        in:['body'],
        exists:{
            errorMessage:'description field is required'
        },
        notEmpty:{
                errorMessage:'description cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'description should be in between 3 to 20 charcters'
        }
    }, 
        
    status:{
        in:['body'],
        exists:{
            errorMessage:'status field is required'
        },
        notEmpty:{
            errorMessage:'status cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'status should be in between 3 to 20 charcters'
        }
    },   
    trim:true
}

    
const idValidationSchema={
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'id is invalid'
        }
    }
}

app.get('/tasks',(req,res)=>{
    Task.find()
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'record not found'})
    })
})


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


app.post('/task',checkSchema(taskValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body = req.body
    Task.create(body)
    .then((task) => {
        res.status(201).json(task)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

app.put('/task/:id',(req,res)=>{
    const id = req.params.id
    const update = req.body
    Task.findByIdAndUpdate(id,update,{new:true,runValidators:true})
    .then((task)=>{
        if(!task){
            res.status(404).json({error:'record not found'})
        }else{
            res.json(task)
        }
    })
    .catch((err)=>{
        res.json(err)
    })
})


app.delete('/task/:id',(req,res)=>{
    const id = req.params.id
    Task.findByIdAndDelete(id)

    .then((task)=>{
        if(!task){
            res.status(404).json({error:"record not found."})
        }else{
            res.json(task)
        }
})
    .catch((err)=>{
        console.log(err)
        res.json(500).json({error:'something went wrong!!!'})
    })
})


app.listen(port,()=>{
    console.log('server is running',port)
})