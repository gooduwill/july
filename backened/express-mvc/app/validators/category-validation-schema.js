const Category = require("../models/category-model")

const categoryValidationSchema={
    name:{
        in:['body'],
        exists:{
            errorMessage:'name filed is required'
        },
        notEmpty:{
                 errorMessage:'name cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'name should be in between 3 to 20 charcters'
        },
        trim:true,
        custom: {
            options: async function(value){
                const category= await Category.findOne({name:value})
                if(category){
                    throw new Error('name is already used')
                } else{
                    return true
                }
            }
        }
    }
}

module.exports = categoryValidationSchema