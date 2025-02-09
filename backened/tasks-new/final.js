const express = require('express')                                                           // npm install express
const mongoose = require('mongoose')                                                        // npm install mongoose
const {checkSchema,validationResult} = require('express-validator')     
const cors =require('cors')

// npm install express-validator
const port = 3030
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/task-app-july24')

.then(()=>{
    console.log('connected to db')
})

.catch((err)=>{
    console.log('error connecting to db',err)
})

const{Schema,model}=mongoose
const TaskSchema = new Schema
({
    title: {
       type: String,
       required: true
    },
    description: {
       type: String,
       required: true
    },
    status: {
       type: String,
       default:"pending"
    }
}, { timestamps: true })

const Task = model('task', TaskSchema)
const TaskValidationSchema={
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

//
app.post('/create-task',checkSchema(TaskValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body=req.body
    Task.create(body)
    .then((task)=>{
        res.status(201).json(task)

    })
    .catch((err)=>{
        res.status(400).json(err)
    })
})

//
app.get('/task',(req,res)=>{
    //const errors=validationResult(req)
    //if(!errors.isEmpty()){
      // return res.status(404).json({errors:errors.array()})}
    
    Task.find()
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    })
})

//
app.delete('/remove-task/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    Task.findByIdAndDelete(id)
    .then((task)=>{
        if(!task){
            res.status(400).json({error:'record not found'})
        }
        else
        {
            res.json(task)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})

//
app.put('/update-task/:id',checkSchema(TaskValidationSchema),checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    Task.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((task)=>{
        if(!task){
            res.status(400).json({error:'record not found'})
        }
        else
        {
            res.json(task)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})

//
app.get('/task/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    Task.findById(id)
    .then((task)=>{
        if(!task){
            res.status(400).json({error:'record not found'})
        }
        else
        {
            res.json(task)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})

app.listen(port, ()=>{
    console.log('express server is running on port', port)
})