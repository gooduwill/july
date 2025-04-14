import Professor from "../models/prof-model.js";
import { checkSchema } from "express-validator";

const ProfessorValidationSchema={
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