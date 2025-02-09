import Apply from "../models/applypost.js";
import { validationResult } from "express-validator";
const applypostCltr={};

applypostCltr.list = async (req,res) => {

    try{
    
        const applypost=await Apply.find()
        res.json(applypost)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
    }
    applypostCltr.create =async (req,res) => {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).json({errors:errors.array()})
        }
        const body=req.body
        console.log('body',body);
        try{
          const applypost= await Apply.create(body)
          res.status(201).json({applypost})
    
        }
        catch(err){
            console.log(err.message)
            res.status(500).json({error:'something went wrong'})
        }
        
    }
    
    applypostCltr.update =async (req,res) => {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).json({errors:errors.array()})
        }
        const id=req.params.id
        const body=req.body
        try{
            const applypost=await Apply.findByIdAndUpdate(id,body,{new:true,runValidators:true})
            if(!applypost){
                return res.status(400).json({error:'record not found'})
    
            }
            res.json(applypost)
        }
        catch(err){
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }
        
    }
    export default applypostCltr;