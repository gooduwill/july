import Good from "../models/users-model.js";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersCltr = {};

// Registers a new user.
// - Validates the request body using express-validator.
// - Requires `email`, `password`, and `role` in the request body.
// - If it's the first user, assigns the role as 'admin' automatically.
// - Hashes the password using bcrypt before saving.
// - Saves the user to the database and returns a 201 response on success.
// - Returns a 400 status for validation or missing field errors.
// - Catches and logs any server errors and returns a 500 response.
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
        const user = new Good({ email, password, role });

        // Determine if this is the first user
        const userCount = await Good.countDocuments();
        if (userCount === 0) {
            user.role = 'admin'; // Make the first user an admin
        }
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

// Logs in an existing user.
// - Validates request body using express-validator.
// - Checks if the user exists with the given email.
// - Compares the provided password with the hashed one in the database.
// - If valid, generates a JWT token (valid for 7 days) containing `userId` and `role`.
// - Returns the token to the client on successful login.
// - Returns 404 errors if email or password is invalid.
// - Handles and logs server errors silently (consider returning 500 for better UX).
usersCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    try {
        //find user by email
        const user1 = await Good.findOne({ email: body.email });
        if (!user1) {
            res.status(404).json({ errors: 'invalid email and password' })
        }
        const isValidUser = await bcryptjs.compare(body.password, user1.password)
        if (!isValidUser) {
            res.status(404).json({ errors: 'invalid password and email' })

        }
        //synchronous operation token generation after login ..after verification token is generated here// userId is payload
        const token = jwt.sign({ userId: user1._id, role: user1.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        //token is sent to frontend
        res.json({ token: `Bearer ${token}` });

    } catch (err) {
        console.log(err)


    }
}

// Returns the currently logged-in user's account information.
// - This is a protected route (accessible only after authentication).
// - Fetches the user based on `userId` from `req.currentUser` (set in auth middleware).
// - Returns the user's details from the database.
// - Handles any server-side errors with a 500 response.
usersCltr.account = async (req, res) => { // this is protected route if user is logged in then only we can access it
    try {
        const user = await Good.findById(req.currentUser.userId)// we get data from database using request from authenticate// req object are same because they are  passed by reference
        res.json(user)
    }
    catch (err) {
        res.satus(500).json({ errors: 'something went wrong' });
    }

}


export default usersCltr;

