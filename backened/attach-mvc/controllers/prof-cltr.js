import Professor from "../models/prof-model.js";
import ProfessorValidationSchema from "../validators/prof-validation-schema.js";
import { validationResult } from "express-validator";
const professorCltr = {};

professorCltr.list = async (req,res) => {

try{

    const professor=await Professor.find()
    res.json(professor)
}
catch(err){
    console.log(err)
    res.status(500).json({error:'something went wrong'})
}
}
professorCltr.create =async (req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('Validation errors:', errors.array()); // Log validation errors for debugging

        return res.status(404).json({errors:errors.array()})
    }
    const body=req.body
    console.log('body',body);
    try{
      const professor= await Professor.create(body)
      res.status(201).json({professor})

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({error:'something went wrong'})
    }
    
}
professorCltr.update =async (req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    try{
        const professor=await Professor.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if(!professor){
            return res.status(400).json({error:'record not found'})

        }
        res.json(professor)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

export default professorCltr;
