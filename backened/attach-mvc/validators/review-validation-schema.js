import Review from "../models/review-model.js";
const ReviewValidationSchema={
review:{
    in:['body'],
    exists:{
        errorMessage:' apply field is required'
    },
    notEmpty:{
             errorMessage:'apply cannot be empty'
    },
    isLength:{
        options:{min:3,max:20},
        errorMessage:'apply should be in between 3 to 20 charcters'
    }
},
name3:{
    in:['body'],
    exists:{
        errorMessage:' apply field is required'
    },
    notEmpty:{
             errorMessage:'apply cannot be empty'
    },
    isLength:{
        options:{min:3,max:20},
        errorMessage:'apply should be in between 3 to 20 charcters'
    }
}
}
export default ReviewValidationSchema;