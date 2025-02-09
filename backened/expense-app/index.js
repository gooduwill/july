const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3070




mongoose.connect('mongodb://127.0.0.1:27017/expense-app-july24')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })





app.use(express.json())
const { Schema, model } = mongoose
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Category = model('category', categorySchema)
app.post('/create-category', (req, res) => {
    const body = req.body
    const categoryObj = new Category(body)
    categoryObj.save()
        .then((category) => {
            res.status(201).json(category)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
app.get('/list-categories', (req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        })

})
app.delete('/remove-category/:id',(req,res)=>{
const id=req.params.id
Category.findByIdAndDelete(id)
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

app.put('/update-category/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Category.findByIdAndUpdate(id, body, {new:true, runValidators:true})
    .then((category)=>{
        if(!category){
            res.status(404).json({error:"record not found"})}
            else{req.json(category)}
        })
        .catch((err)=>{
res.json(err)
        })

 } )

app.get('/category/:id',(req,res)=>{
const id=req.params.id
Category.findById(id)
.then((category)=>{
    if(!category){
     res.status(404).json({message:"record not found"})
    }
    else{res.json(category)}
})
.catch((err)=>{
    console.log(err)
    res.status(500).json({error:'something went wrong'})

})
}
)
app.delete('/remove-category/:id',(req,res)=>{
    const id=req.params.id
    Category.findByIdAndDelete(id)
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

const expenseSchema=new Schema({
expenseDate:{
    type:Date,
    required: true
},
title:{
    type:String,
    required: true,
    minlength:3
},
amount:{
    amount:Number,
    required: true,
    min:1
},
category:{
type:Schema.Types.ObjectId,
required: true,
ref:"Category"
},
description:{
    type:String
}
},{timestamps: true})
 
const Expense=mongoose.model('Expense',expenseSchema)
app.post('/expenses',(req,res)=>{
const body=req.body
Expense.create(body)
.then((expense)=>{
res.status(201).json(expense)
})
.catch((err)=>{
console.log(err)
res.status(400).json(err)
})

})


app.get('/expenses', (req, res) => {
    Expense.find()
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        })
    })
    app.get('/expenses/:id',(req,res)=>{
        const id=req.params.id
        Expense.findById(id)
        .then((expense)=>{
            if(!expense){
             res.status(404).json({message:"record not found"})
            }
            else{res.json(expense)}
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        
        })
        }
        )
        app.delete('/expenses/:id',(req,res)=>{
            const id=req.params.id
            Expense.findByIdAndDelete(id)
            .then((expenses)=>{
            if(!expenses){
                res.status(404).json({error:'record not found'})
            }
            else{
                res.json(expenses)
            }
            
            })
            .catch((err)=>{
            console.log(err)
            res.status(500).json({error:'something went wrong'})
            })
            
            })
            app.put('/expenses/:id',(req,res)=>{
                const id=req.params.id
                const body=req.body
                Expense.findByIdAndUpdate(id, body, {new:true, runValidators:true})
                .then((expenses)=>{
                    if(!expenses){
                        res.status(404).json({error:"record not found"})}
                        else{req.json(expenses)}
                    })
                    .catch((err)=>{
            res.json(err)
                    })
            
             } )
app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})