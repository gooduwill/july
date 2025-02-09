import Enquiry from "../models/enquiry-model.js";
import Product from "../models/product-model.js";
import { validationResult } from "express-validator"; 
const enquiriesCltr={};

enquiriesCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body=req.body
    try{
      const enquiry= new Enquiry(body);
      enquiry.buyer=req.currentUser.userId;
      await enquiry.save()
      res.status(201).json({enquiry})

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({error:'something went wrong'})
    }
}
enquiriesCltr.myEnquires=async(req,res)=>{
    try{
    
        const enquires=await Enquiry.find({buyer: req.currentUser.userId});
        res.json(enquires)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }

}
enquiriesCltr.show=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})

    }
    const id = req.params.id;
    try{
        const enquiry= await Enquiry.findOne({_id:id, buyer: req.currentUser.userId})
        if(!enquiry){
            return res.status(404).json({errors:'record not found'})
        }
       res.json(enquiry);
    } catch(err) {
        console.log(err)
        res.status(500).json({error:'something went wrong'})
   
    }
}

enquiriesCltr.product= async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})

    }
    
    //id is of product
    const id=req.params.id;
    try{
    let product;
    if(req.currentUser.role=='admin'){
        product= await Product.findById(id);
    }
    else{
        product= await Product.findOne({_id:id, user: req.currentUser.userId});
    }

     
    if(!product){
        return res.status(404).json({errors:'record not found'})}

    const enquires=await Enquiry.find({product:id});
    res.json(enquires)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
   
    }


    

}

export default enquiriesCltr;