import Department from "../models/department-model.js"
//import {body} from 'express-validator';
import { ExpressValidator } from "express-validator";
/*const DepartmentValidationSchema={
    department:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
                 errorMessage:'name cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'name should be in between 3 to 20 charcters'
        }
    },

}*/

// Define validation schema
/* const DepartmentValidationSchema = {
  Department: [
    body('stream')
      .exists().withMessage('Stream is required')
      .notEmpty().withMessage('Stream cannot be empty')
      .isLength({ min: 3, max: 100 }).withMessage('Stream should be between 3 to 100 characters'),
    
    body('research')
      .exists().withMessage('Research fields are required')
      .notEmpty().withMessage('Research fields cannot be empty')
      .isArray().withMessage('Research must be an array'),
    
    //Here, Loop through each research item...
    body('research.*.topic')
      .exists().withMessage('Topic is required')
      .notEmpty().withMessage('Topic cannot be empty')
      .isLength({ min: 3, max: 100 }).withMessage('Topic should be between 3 to 100 characters'),
    
    body('research.*.workarea')
      .exists().withMessage('Workarea is required')
      .notEmpty().withMessage('Workarea cannot be empty')
      .isArray().withMessage('Workarea must be an array')
  ]
};

*/

import { body } from "express-validator";

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




//export default DepartmentValidationSchema;