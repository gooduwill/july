  
  const enquiryValidationSchema={
    product:{
        in:['body'],
        exists:{
            errorMessage:'product  filed is required'
        },
        notEmpty:{
                 errorMessage:'product cannot be empty'
        },
        isMongoId:{
            errorMessage: 'product is a valid mongo id'
        },
        trim:true
    }
  }
  export default enquiryValidationSchema;