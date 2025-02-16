import Good from "../models/users-model.js";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersCltr = {};
/*usersCltr.register=async(req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body;
    console.log('body',body);
    const user1=new Good(body);
    const userCount=await Good.countDocuments();
    //to make first user as admin
    if(userCount==0){
        user1.role='admin';
    }
    console.log('User Count:', userCount);
console.log('First User:', user1);
console.log('First User:', user1.role);

    try{
        const salt=await bcryptjs.genSalt()
        user1.password= await bcryptjs.hash(body.password,salt);
        await user1.save();
    res.status(201).json(user1)

    }catch(err){
        res.status(500).json({error:'something went wrong'})
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

        
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Email, password, and role are required.' });
        }

        // Create a new user instance
        const user = new Good({ email,password, role });

        // Determine if this is the first user
        const userCount = await Good.countDocuments();
        if (userCount === 0) {
            user.role = 'admin'; // Make the first user an admin
        }
        //else{
        //   user.role='user';
        //}

        // Hash the password
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, salt);

        // Save the user to the database
        await user.save();
        return res.status(201).json(user);
        // Return the created user

       } catch (err) {
        console.error('Error occurred during user registration:', err); // Log the error for debugging
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};
/*
usersCltr.login=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
    const user=Good.findOne({email:body.email});
    if(!user){
        return res.status(401).json({errors:'invaild email'})

    }
    const validUser=await bcryptjs.compare(body.password,user.password)
    if(!validUser){
        return res.status(401).json({errors:'invaild password'})

    }
    //generate jwt token
    res.json(user)
}
    catch(err){

    }
} */
usersCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    try {
        const user1 = await Good.findOne({ email: body.email });
        if (!user1) {
            res.status(404).json({ errors: 'invalid email and password' })
        }
        const isValidUser = await bcryptjs.compare(body.password, user1.password)
        if (!isValidUser) {
            res.status(404).json({ errors: 'invalid password and email' })

        }
        //synchronous operation token generation
        const token = jwt.sign({ userId: user1._id, role: user1.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token: `Bearer ${token}` });

    } catch (err) {
        console.log(err)


    }
}
usersCltr.account = async (req, res) => {
    try {
        const user = await Good.findById(req.currentUser.userId)
        res.json(user)
    }
    catch (err) {
        res.satus(500).json({ errors: 'something went wrong' });
    }

}


export default usersCltr;

