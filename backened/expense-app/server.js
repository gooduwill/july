
const express = require('express')
const mongoose = require('mongoose')
const { checkSchema, validationResult, check } = require('express-validator')
const app = express()
const PORT = 3070




mongoose.connect('mongodb://127.0.0.1:27017/expense-app-july24')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })





app.use(express.json())
const { Schema, model } = mongoose
const categorySchema = new Schema({
    name: {
        type: String
        //required: true
    }
}, { timestamps: true })

const Category = model('category', categorySchema)
const categoryValidationSchema = {
    name: {
        in: ['body'],
        Exists: {
            error: 'name field is required'
        },

        notEmpty: {
            error: 'category name cannot be empty'

        },
        isLength: {
            options: { min: 3, max: 20 },
            error: 'name should be between 3 to 20 characters long'
        },
        trim: true
    }}
    const idValidationSchema={
        id:{
            in:['params'],
            isMongoId:{
                error:'id is invalid'
            }
        }
    }


app.post('/create-category', checkSchema(categoryValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const body = req.body
    Category.create(body)
        .then((category) => {
            res.status(201).json(category)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})
app.get('/list-categories', (req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'something went wrong' })
        })

})
app.delete('/remove-category/:id',checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((category) => {
            if (!category) {
                res.status(404).json({ error: 'record not found' })
            }
            else {
                res.json(category)
            }

        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'something went wrong' })
        })

})

app.put('/update-category/:id', checkSchema(categoryValidationSchema), checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((category) => {
            if (!category) {
                res.status(404).json({ error: "record not found" })
            }
            else { req.json(category) }
        })
        .catch((err) => {
            res.json(err)
        })

})

app.get('/category/:id',checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
            if (!category) {
                res.status(404).json({ message: "record not found" })
            }
            else { res.json(category) }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'something went wrong' })

        })
}
)
app.delete('/remove-category/:id', (req, res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((category) => {
            if (!category) {
                res.status(404).json({ error: 'record not found' })
            }
            else {
                res.json(category)
            }

        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'something went wrong' })
        })

})
const expenseSchema = new Schema({
    expenseDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true }); 

const Expense =mongoose.model('Expense', expenseSchema);


const expenseValidationSchema = {
    expenseDate: { 
        in: ['body'],
        exists: { 
            errorMessage: 'expense date is required'
        },
        notEmpty: {
            errorMessage: 'date cannot be empty'
        },
        isDate: {
            options: { format: "yyyy-mm-dd"},
            errorMessage: 'date should be in yyyy-mm-dd'
        }, 
        trim: true 
    },
    title: { 
        in : ['body'],
        exists: { 
            errorMessage: 'title field is required'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'title should be atleast 3 characters'
        },
        trim: true 
    },
    amount: {
        in: ['body'],
        exists: {
            errorMessage: 'amout field is required'
        },
        notEmpty: {
            errorMessage: 'amount cannot be empty'
        },
        isFloat: {
            options: { min: 1},
            errorMessage: 'amount should be a number with minimum 1'
        }
    },
    description: {
        in: ['body'],
        optional: true, 
        exists: { 
            errorMessage: 'description field is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'description should be atleast 5 charactesr'
        }
    },
    category: {
        in: ['body'],
        exists: {
            errorMessage: 'category field is required'
        },
        isMongoId: {
            errorMessage: 'category id is invalid'
        }
    }
}



//post  --> create()
app.post('/expenses',checkSchema(expenseValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const body = req.body
    Expense.create(body)
        .then((expense) => {
            res.status(201).json(expense)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
})

//get /expenses  --> find()
app.get('/expenses', (req, res) => {
    const id = req.params.id
    Expense.find(id)
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' })
        })
})


//get /expenses:id  --> findById()
app.get('/expenses/:id',checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const id = req.params.id
    Expense.findById(id)
        .then((expense) => {
            if (!expense) {
                res.status(404).json({ error: 'record not found' })
            } else {
                res.json(expense)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' })
        })
})


//delete /expenses/:id  --> findByIdAndDelete()
app.delete('/expenses/:id', checkSchema(idValidationSchema),(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const id = req.params.id
    Expense.findByIdAndDelete(id)
        .then((expense) => {
            if (!expense) {
                res.status(404).json({ error: 'record not found' })
            } else {
                res.json(expense)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' })
        })
})

//put /expenses/:id  --> findByIdAndUpdate()
app.put('/expenses/:id',checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    Expense.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((expense) => {
            if (!expense) {
                res.status(404).json({ error: 'Something went wrong' })
            } else {
                res.json(expense)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' })
        })

})


//get /expenses/category/:id  --> findById({category:id})
app.get('/expenses/category/:id', checkSchema(idValidationSchema),(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const id = req.params.id
    Expense.find({ category: id })
        .then((expense) => {
            if (!expense) {
                res.status(400).json({ error: 'record not found' })
            } else {
                res.json(expense)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' })
        })
})
app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})