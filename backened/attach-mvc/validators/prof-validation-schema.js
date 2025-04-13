import Professor from "../models/prof-model.js";
import { checkSchema } from "express-validator";

// Validation schema for the professor data. This schema checks the validity of data related to a professor's name, area, and email.
const ProfessorValidationSchema={
    // Validates the 'name2' field (Professor's Name):
    // 1. Ensures the 'name2' field exists in the request body.
    // 2. Ensures 'name2' is not empty.
    // 3. Ensures the 'name2' is between 3 and 20 characters in length.
    name2:{
        in:['body'],
        exists:{
            errorMessage:' name field is required'
        },
        notEmpty:{
                 errorMessage:'name cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'Name should be in between 3 to 20 charcters'
        }
    },
    // Validates the 'area' field (Research Experience):
    // 1. Ensures the 'area' field exists in the request body.
    // 2. Ensures 'area' is not empty.
    // 3. Ensures 'area' is between 3 and 100 characters in length.
    area:{
        in:['body'],
        exists:{
            errorMessage:' Research Experience field is required'
        },
        notEmpty:{
                 errorMessage:'Research experience cannot be empty'
        },
        isLength:{
            options:{min:3,max:100},
            errorMessage:'Research experience should be in between 3 to 100 charcters'
        }
    },
    // Validates the 'email' field (Professor's email address):
    // 1. Ensures the 'email' field exists in the request body.
    // 2. Ensures 'email' is not empty.
    // 3. Ensures 'email' follows a valid email format.
    // 4. Trims any leading or trailing spaces in the email.
    // 5. Normalizes the email to a consistent format.
    // 6. Checks if the email is already taken by a professor.
    // 7. If the email is already taken, throws an error.
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email field is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be valid format'
        },
        trim: true,
        normalizeEmail: true, 
        custom : {
            options: async function(value){
                try {
                    const user = await Professor.findOne({ email: value})
                    if(user) {
                        throw new Error('Email is already taken')
                    }
                } catch (err) {
                    throw new Error(err.message)
                }
                return true
            }
        }
    },


}
export default ProfessorValidationSchema;