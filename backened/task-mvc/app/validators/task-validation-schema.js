const TaskValidationSchema={
    title:{
        in:['body'],
        exists:{
            errorMessage:'title field is required'
        },
        notEmpty:{
                 errorMessage:'title cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'title should be in between 3 to 20 charcters'
        }
    },

    description:{
        in:['body'],
        exists:{
            errorMessage:'description field is required'
        },
        notEmpty:{
                errorMessage:'description cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'description should be in between 3 to 20 charcters'
        }
    }, 
        
    status:{
        in:['body'],
        exists:{
            errorMessage:'status field is required'
        },
        notEmpty:{
            errorMessage:'status cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'status should be in between 3 to 20 charcters'
        }
    },   
    trim:true
}
module.exports=TaskValidationSchema