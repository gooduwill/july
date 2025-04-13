import Department from "../models/department-model.js"
import { ExpressValidator } from "express-validator";
import { body } from "express-validator";

// Validation schema for the 'Department' object in the request body.
// This schema ensures that the data is correctly structured and meets the necessary criteria for fields like 'stream' and 'research'.

// 1. Validates the 'stream' field:
//    - Ensures 'stream' exists in the body of the request.
//    - Checks that 'stream' is not empty.
//    - Validates that the length of 'stream' is between 3 and 100 characters.
//    - Custom error messages are provided for each validation rule.

// 2. Validates the 'research' field:
//    - Ensures 'research' exists in the body of the request.
//    - Checks that 'research' is not empty.
//    - Validates that 'research' is an array.
//    - Custom error messages are provided for each validation rule.

// 3. Validates each item in the 'research' array:
//    - Validates the 'topic' field within each research item:
//      - Ensures 'topic' exists, is not empty, and is between 3 and 100 characters in length.
//    - Validates the 'workarea' field within each research item:
//      - Ensures 'workarea' exists, is not empty, and is an array of values.
//    - Custom error messages are provided for each validation rule in the 'research' array.

const DepartmentValidationSchema = [
  body('stream')
    .exists().withMessage('Stream is required')
    .notEmpty().withMessage('Stream cannot be empty')
    .isLength({ min: 3, max: 100 }).withMessage('Stream should be between 3 to 100 characters'),

  body('research')
    .exists().withMessage('Research fields are required')
    .notEmpty().withMessage('Research fields cannot be empty')
    .isArray().withMessage('Research must be an array'),

  // Validate each research item in the array
  body('research.*.topic')
    .exists().withMessage('Topic is required')
    .notEmpty().withMessage('Topic cannot be empty')
    .isLength({ min: 3, max: 100 }).withMessage('Topic should be between 3 to 100 characters'),

  body('research.*.workarea')
    .exists().withMessage('Workarea is required')
    .notEmpty().withMessage('Workarea cannot be empty')
    .isArray().withMessage('Workarea must be an array')
];

export default DepartmentValidationSchema;




