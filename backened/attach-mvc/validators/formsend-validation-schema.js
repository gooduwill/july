import Good from "../models/users-model.js";

// Validation schema for the 'Formsend' object in the request body.
// This schema defines validation rules for multiple fields in the request body, including fields like 'name', 'applypost', 'instituteName', etc.
// Custom error messages are provided for each validation rule, and specific checks for date validation are implemented for 'edate'.

// 1. Validates the 'name' field:
//    - Ensures 'name' exists and is not empty in the request body.
//    - Checks that the length of 'name' is between 3 and 20 characters.


// 2. Validates the 'applypost' field:
//    - Ensures 'applypost' exists and is not empty in the request body.


// 3. Validates the 'instituteName' field:
//    - Ensures 'instituteName' exists and is not empty in the request body.
//    - Checks that the length of 'instituteName' is between 3 and 20 characters.


// 4. Validates the 'edate' field:
//    - Ensures 'edate' exists in the request body and is a valid date (YYYY-MM-DD format).
//    - Includes a custom check to ensure the date is not in the future (it must be today or in the past).


// 5. Validates the 'degree' field:
//    - Ensures 'degree' exists and is not empty in the request body.
//    - Checks that the length of 'degree' is between 3 and 20 characters.


// 6. Validates the 'name2' field (Professor's name):
//    - Ensures 'name2' exists and is not empty in the request body.
//    - Checks that the length of 'name2' is between 3 and 20 characters.


// 7. Validates the 'department' field:
//    - Ensures 'department' exists and is not empty in the request body.


// 8. Validates the 'research' field:
//    - Ensures 'research' exists and is not empty in the request body.


// 9. Validates the 'workarea' field:
//    - Ensures 'workarea' exists and is not empty in the request body.


// 10. Validates the 'ResearchExp' field (Research Experience):
//     - Ensures 'ResearchExp' exists and is not empty in the request body.
//     - Checks that the length of 'ResearchExp' is between 3 and 100 characters.
const FormsendValidationSchema={
    name:{
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
    applypost:{
        in:['body'],
        exists:{
            errorMessage:'applypost field is required'
        },
        notEmpty:{
                 errorMessage:'applypost cannot be empty'
        },
        
    },

    instituteName:{
        in:['body'],
        exists:{
            errorMessage:'institute name field is required'
        },
        notEmpty:{
                errorMessage:'institute name cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'institute name should be in between 3 to 20 charcters'
        }
    }, 
    edate: {
        in: ['body'],
        exists: {
          errorMessage: 'edate field is required',
        },
        isDate: {
          errorMessage: 'edate must be in the format YYYY-MM-DD',
        },
        
        custom: {
            options: (value) => {
                const date = new Date(value);
                const today = new Date();
                
                // Normalize today's date to remove the time part
                today.setHours(0, 0, 0, 0);
        
                if (date > today) {
                    throw new Error('The date must be today or a past date');
                }
                return true;
            },
        },
    },
    degree:{
        in:['body'],
        exists:{
            errorMessage:'Highest degree field is required'
        },
        notEmpty:{
                 errorMessage:'Highest degree cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'name should be in between 3 to 20 charcters'
        }
    },
    name2:{
        in:['body'],
        exists:{
            errorMessage:' Prof name field is required'
        },
        notEmpty:{
                 errorMessage:'Prof name cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:' Prof name should be in between 3 to 20 charcters'
        }
    },
    department: {
        in: ['body'],
        exists: {
            errorMessage: 'department field is required'
        },
        
    },
    research: {
        in: ['body'],
        exists: {
            errorMessage: 'department field is required'
        },
        
    },
        
    workarea: {
        in: ['body'],
        exists: {
            errorMessage: 'department field is required'
        },
        
    },
    ResearchExp:{
        in:['body'],
        exists:{
            errorMessage:'Research Experience is required'
        },
        notEmpty:{
                 errorMessage:'Research EXperience  cannot be empty'
        },
        isLength:{
            options:{min:3,max:100},
            errorMessage:'Research should be in between 3 to 100 charcters'
        }
    },
    

   
}
export default FormsendValidationSchema;



