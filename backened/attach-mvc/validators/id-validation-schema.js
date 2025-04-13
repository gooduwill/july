// Validation schema for the 'id' parameter in the URL (URL params).
// This schema validates that the 'id' provided in the request params is a valid MongoDB ObjectId.

// 1. Validates the 'id' parameter:
//    - Ensures that the 'id' is a valid MongoDB ObjectId using the 'isMongoId' validation method.
//    - If the 'id' is not a valid MongoDB ObjectId, it returns an error with the message "id is invalid".
const idValidationSchema = {
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'id is invalid'
        }
    }
}


export default idValidationSchema;