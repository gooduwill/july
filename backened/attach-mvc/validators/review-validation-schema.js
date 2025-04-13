import Review from "../models/review-model.js";

// Validation schema for review data. This schema validates the fields for creating or updating a review.
const ReviewValidationSchema={
    // Validates the 'review' field (The review text):
    // 1. Ensures the 'review' field exists in the request body.
    // 2. Ensures the 'review' field is not empty.
    // 3. Ensures the 'review' text is between 3 and 20 characters in length.
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
// Validates the 'rating' field (The rating given by the user):
    // 1. Ensures the 'rating' field exists in the request body.
    // 2. Ensures the 'rating' field is not empty.
    // 3. Ensures the 'rating' is between 3 and 20 characters in length.
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
// Validates the 'name3' field (The name of the reviewer):
    // 1. Ensures the 'name3' field exists in the request body.
    // 2. Ensures the 'name3' field is not empty.
    // 3. Ensures the 'name3' is between 3 and 20 characters in length.
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