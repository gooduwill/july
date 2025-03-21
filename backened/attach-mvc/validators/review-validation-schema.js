import Review from "../models/review-model.js";
const ReviewValidationSchema={
review:{
    in:['body'],
    exists:{
        errorMessage:' review field is required'
    },
    notEmpty:{
             errorMessage:'review cannot be empty'
    },
    isLength:{
        options:{min:3,max:20},
        errorMessage:'review should be in between 3 to 20 charcters'
    }
},
rating:{
    in:['body'],
    exists:{
        errorMessage:' rating field is required'
    },
    notEmpty:{
             errorMessage:'rating cannot be empty'
    },
    isLength:{
        options:{min:3,max:20},
        errorMessage:'rating should be in between 3 to 20 charcters'
    }
},
name3:{
    in:['body'],
    exists:{
        errorMessage:' name field is required'
    },
    notEmpty:{
             errorMessage:'name cannot be empty'
    },
    isLength:{
        options:{min:3,max:20},
        errorMessage:'name should be in between 3 to 20 charcters'
    }
}
}
export default ReviewValidationSchema;