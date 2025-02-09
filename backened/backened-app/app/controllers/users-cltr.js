import User from '../models/user-model.js'
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
const usersCltr={}
/*
usersCltr.register=async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const body=req.body;
    const user=new User(body);
    const userCount= await User.countDocuments();
    //to make first user admin
    if(userCount==0){
        user.role='admin';
    }
    try{
        const salt= await bcryptjs.genSalt();
        user.password= await bcryptjs.hash(body.password, salt)
        await user.save();
        res.status(201).json(user)
    } catch(err){
        res.status(500).json({error: 'something went wrong'})
    }

}*/

usersCltr.register = async (req, res) => {
    try {
        // Validate the incoming request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array()); // Log validation errors for debugging
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract data from the request body
        const { email, password, role } = req.body;

        // Check for missing fields explicitly (optional, as validation should handle this)
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Email, password, and role are required.' });
        }

        // Create a new user instance
        const user = new User({ email, role });

        // Determine if this is the first user
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            user.role = 'admin'; // Make the first user an admin
        }

        // Hash the password
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, salt);

        // Save the user to the database
        await user.save();
        return res.status(201).json(user); // Return the created user

    } catch (err) {
        console.error('Error occurred during user registration:', err); // Log the error for debugging
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};


 usersCltr.login=async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const body=req.body;
    try{
        const user= await User.findOne({email: body.email});
        if(!user){
            res.status(404).json({errors:'invalid email'})
        }
       const isValidUser= await bcryptjs.compare(body.password, user.password)
       if(!isValidUser){
         res.status(404).json({errors:'invalid password'})

       }
       //synchronous operation
       const token= jwt.sign({userId: user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
        return res.json({token: `Bearer ${token}`});
    } catch(err) 
    {
        return res.status(500).json({ errors: 'Internal server error' }); // Handle errors properly

 
    }
 } 
    /*usersCltr.login = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const body = req.body;
    
        try {
            // Find the user by email
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return res.status(404).json({ errors: 'Invalid email' });
            }
    
            // Compare the password
            const isValidUser = await bcryptjs.compare(body.password, user.password);
            if (!isValidUser) {
                return res.status(404).json({ errors: 'Invalid password' });
            }
    
            // Generate a token
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
    
            // Send the token as a response
            res.json({ token: `Bearer ${token}` });
        } catch (err) {
            console.error('Login error:', err); // Log the error for debugging
            res.status(500).json({ error: 'Internal server error' });
        }
    };*/
    
  usersCltr.account=async(req,res)=>{
    try{
        const user= await User.findById(req.currentUser.userId);
        res.json(user);
    } catch(err){
        console.log(err)
    }
}
    /*usersCltr.account = async (req, res) => {
        try {
            console.log("Current User ID:", req.currentUser.userId); // Debug log
            const user = await User.findById(req.currentUser.userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    };*/
    


export default usersCltr