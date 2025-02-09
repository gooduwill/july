const Expense = require('../models/expense-model')
const { validationResult } = require('express-validator')

const expensesCltr = {}

expensesCltr.list =async (req,res) => {

try{
    const expenses=await Expense.find()
    res.status(201).json(expense)

}
catch{
    console.log(err)
        res.status(500).json({error:'something went wrong'})
}
    /*
    Expense.find()
    .then((expense)=>{
        res.status(201).json(expense)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }) */
}

expensesCltr.create =async (req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body = req.body
    try{
        const expenses=await Expense.create(body)
        res.status(201).json(expenses)

    }
    catch{
        res.status(400).json({ error: err.message })

    }
    /*
    Expense.create(body)
      .then((expense) => {
         res.status(201).json(expense)
      })
      .catch((err)=> {
         res.status(400).json({ error: err.message })
     })*/
    }
/*
expensesCltr.update=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
try{
    const expenses=await Expense.findByIdAndUpdate(id,body,{new:true,runValidators})
    if(!expenses){
      return  res.status(400).json({error:'record not found'})}
      req.json(expenses)
}
catch{
    console.log(err)
    res.status(500).json({error:'something went wrong'})} */

    expensesCltr.update=async (req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).json({errors:errors.array()})
        }
        const id=req.params.id
        const body=req.body
        try{
            const expenses= await Expense.findByIdAndUpdate(id,body,{new:true,runValidators:true})
            if(!expenses){
               return res.status(400).json({error:'record not found'})}
        
        res.json(expenses)}
        catch{
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }

    /*
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

    })*/


}






expensesCltr.remove=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    
    const expense=Expense.findByIdAndDelete(id)
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
    const expense=Expense.findById(id)
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


expensesCltr.list = (req,res) => {
    const expense=Expense.find()
    .then((expense)=>{
        res.status(201).json(expense)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    })
}


module.exports = expensesCltr