const Expense = require('../models/expense-model')
const { validationResult } = require('express-validator')

const expensesCltr = {}

expensesCltr.list = (req,res) => {
    Expense.find()
    .then((expense)=>{
        res.status(201).json(expense)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    })
}

expensesCltr.create = (req,res) => {
    
    const body = req.body
    Expense.create(body)
      .then((expense) => {
         res.status(201).json(expense)
      })
      .catch((err)=> {
         res.status(400).json({ error: err.message })
     })
    }

expensesCltr.update=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    Expense.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })


}






expensesCltr.remove=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    Expense.findByIdAndDelete(id)
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
}
expensesCltr.show=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    Expense.findById(id)
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })


}


module.exports = expensesCltr