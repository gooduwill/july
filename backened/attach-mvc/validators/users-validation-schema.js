import Good from "../models/users-model.js"
export const userRegisterSchema = {
    // Validates the 'email' field during user registration:
    // 1. Ensures the 'email' field exists in the request body.
    // 2. Ensures the 'email' field is not empty.
    // 3. Ensures the 'email' is in a valid format (email address).
    // 4. Trims and normalizes the email (removes extra spaces and standardizes the format).
    // 5. Checks if the email is already taken in the database.
    //    If a user with the same email exists, an error message is thrown.
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email field is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMesssage: 'email should be valid format'
        },
        trim: true,
        normalizeEmail: true, 
        custom : {
            options: async function(value){
                try {
                    const user = await Good.findOne({ email: value})
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
     // Validates the 'password' field during user registration:
    // 1. Ensures the 'password' field exists in the request body.
    // 2. Ensures the 'password' field is not empty.
    // 3. Validates the password to be strong by requiring:
    //    - A minimum length of 8 characters.
    //    - At least 1 lowercase letter.
    //    - At least 1 uppercase letter.
    //    - At least 1 numeric character.
    //    - At least 1 special character (symbol).
    // 4. Trims the password to remove extra spaces.
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumber: 1,
                minSymbol: 1
            },
            errorMessage: 'password must contain atleast one lowercase, one uppercase, one number and one symbol and it must be minimum 8 charecters long'
        },
        trim: true
    }
}

export const userLoginSchema = {
    // Validates the 'email' field during user login:
    // 1. Ensures the 'email' field exists in the request body.
    // 2. Ensures the 'email' field is not empty.
    // 3. Ensures the 'email' is in a valid format (email address).
    // 4. Trims and normalizes the email (removes extra spaces and standardizes the format).
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email field is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMesssage: 'email should be valid format'
        },
        trim: true,
        normalizeEmail: true, 
        
    },
     // Validates the 'password' field during user login:
    // 1. Ensures the 'password' field exists in the request body.
    // 2. Ensures the 'password' field is not empty.
    // 3. Validates the password to be strong by requiring:
    //    - A minimum length of 8 characters.
    //    - At least 1 lowercase letter.
    //    - At least 1 uppercase letter.
    //    - At least 1 numeric character.
    //    - At least 1 special character (symbol).
    // 4. Trims the password to remove extra spaces.
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumber: 1,
                minSymbol: 1
            },
            errorMessage: 'password must contain atleast one lowercase, one uppercase, one number and one symbol and it must be minimum 8 charecters long'
        },
        trim: true
    }
}