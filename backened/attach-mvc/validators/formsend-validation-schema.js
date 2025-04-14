import Good from "../models/users-model.js";
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



