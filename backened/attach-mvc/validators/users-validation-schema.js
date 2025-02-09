import Good from "../models/users-model.js"
export const userRegisterSchema = {
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