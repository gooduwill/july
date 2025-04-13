import Apply from "../models/applypost.js";

// Validation schema for the 'apply' field in the request body.
// - Ensures that the 'apply' field exists in the body of the request.
// - Checks that the 'apply' field is not empty.
// - Enforces a length constraint on the 'apply' field, requiring it to be between 3 and 20 characters.
// - Custom error messages are provided for each validation rule:
//   - 'apply field is required' if the field is missing.
//   - 'apply cannot be empty' if the field is empty.
//   - 'apply should be between 3 to 20 characters' if the field's length is not within the specified range.

const ApplyValidationSchema={
apply:{
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
export default ApplyValidationSchema;
