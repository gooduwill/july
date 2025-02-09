import Department from "../models/department-model.js"
import { validationResult } from "express-validator";

const departmentsCltr = {}

departmentsCltr.list = async (req,res) => {

try{

    const departments=await Department.find()
    res.json(departments)
}
catch(err){
    console.log(err)
    res.status(500).json({error:'something went wrong'})
}
}
departmentsCltr.create =async (req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body=req.body
    console.log('body',body);
    try{
      const department= await Department.create(body)
      res.status(201).json({department})

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({error:'something went wrong'})
    }
    
}

departmentsCltr.update =async (req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    try{
        const department=await Department.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if(!department){
            return res.status(400).json({error:'record not found'})

        }
        res.json(department)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
    
}
export default departmentsCltr;
