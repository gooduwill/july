const productValidationSchema={
    name:{
        in:['body'],
        exists:{
            errorMessage:'name filed is required'
        },
        notEmpty:{
                 errorMessage:'name cannot be empty'
        },
        trim:true,
        
    },
    description:{
        in:['body'],
        exists:{
            errorMessage:'description filed is required'
        },
        notEmpty:{
                 errorMessage:'description cannot be empty'
        },
        trim:true,
        
    },
    price:{
        in:['body'],
        exists:{
            errorMessage:'price filed is required'
        },
        notEmpty:{
                 errorMessage:'price cannot be empty'
        },
        isNumeric:{
            options: {min: 1},
            errorMessage:'price minimum is 1'
        },
        trim:true,
        
    },
    category:{
        in:['body'],
        exists:{
            errorMessage:'category filed is required'
        },
        notEmpty:{
                 errorMessage:'category cannot be empty'
        },
        isMongoId:{
            errorMessage: 'product is a valid mongo id'
        },
        trim:true,
        
    },
}
export default productValidationSchema;