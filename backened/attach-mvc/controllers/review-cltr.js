//import Review from "../models/review-model.js";
//import { validationResult } from "express-validator";
//const reviewCltr={};

/*reviewCltr.list = async (req,res) => {

    try{
    
        const reviews=await Review.find()
        res.json(reviews)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
    }
    reviewCltr.create =async (req,res) => {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).json({errors:errors.array()})
        }
        const body=req.body
        console.log('body',body);
        try{
          const reviews= await Review.create(body)
          res.status(201).json({reviews})
    
        }
        catch(err){
            console.log(err.message)
            res.status(500).json({error:'something went wrong'})
        }
        
    }
    
    reviewCltr.update =async (req,res) => {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).json({errors:errors.array()})
        }
        const id=req.params.id
        const body=req.body
        try{
            const reviews=await Review.findByIdAndUpdate(id,body,{new:true,runValidators:true})
            if(!reviews){
                return res.status(400).json({error:'record not found'})
    
            }
            res.json(reviews)
        }
        catch(err){
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }
        
    }
    export default reviewCltr;
    */
    import Review from "../models/review-model.js";
    import { validationResult } from "express-validator";
    import mongoose from "mongoose";
    
    const reviewCltr = {};
    
    // List reviews for a specific professor
    /*reviewCltr.list = async (req, res) => {
      try {
        const { professorId } = req.query;
        const query = professorId ? { professorId } : {}; // Filter by professor if ID is provided
        const reviews = await Review.find(query);
        res.json(reviews);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
      }
    };*/
    
    // Create a new review
    reviewCltr.create = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
    
      const { review, name3,rating, professorId } = req.body;
    
      if (!professorId) {
        return res.status(400).json({ error: "Professor ID is required" });
      }
    
      try {
        const newReview = await Review.create({ review, name3, rating,   professorId 
        });
        res.status(201).json(newReview);
      } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Something went wrong" });
      }
    };
   

reviewCltr.list = async (req, res) => {
  try {
    const { professorId } = req.query;
    if (!professorId) {
      return res.status(400).json({ error: "Professor ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(professorId)) {
      return res.status(400).json({ error: "Invalid Professor ID" });
    }
  
    const query = { professorId: new mongoose.Types.ObjectId(professorId) };
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
    
    export default reviewCltr;
    