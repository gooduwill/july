import User from '../models/user-model.js'
export const userContactSchema={
    name:{
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name cannot be empty'
        },

    },
    email:{
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
    isEmail:{
        errorMessage:'email should be valid format'
        
    },
    trim:true,
    normalizeEmail:true,
    /* custom:{
        options: async function(value){
            try{
                const user=await User.findOne({email:value})
                if(user){
                    throw new Error('email is already taken')
                }
            }catch(err){
                throw new Error(err.message)
            }
            return true
        }
    }*/
    },
    
     mobileNo :{
              exists:{
                errorMessage:'mobile no is required'
              },
              notEmpty:{
                errorMessage:'mobile no cannot be empty'
              }
     },
       message:{
            exists:{
            errorMessage:'message is required'
          },
          notEmpty:{
            errorMessage:'message cannot be empty'
          },

       }

    }
export const userLoginSchema={
    email:{
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
    isEmail:{
        errorMessage:'email should be valid format'
        
    },
    trim:true,
    normalizeEmail:true
   
    },
    password:{
        exists:{
            errorMessage:'password field is required'

        },
        notEmpty:{
            errorMessage:'password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowercase:1,
                minUppercase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password must be one lower case one uppercase 8 character long'

        },
        trim:true
    },
    mobileNo :{
        exists:{
          errorMessage:'mobile no is required'
        },
        notEmpty:{
          errorMessage:'mobile no cannot be empty'
        }
},
 Message:{
  exists:{
      errorMessage:'message is required'
    },
    notEmpty:{
      errorMessage:'message cannot be empty'
    }

 }

}