const express = require('express');
const { checkSchema, validationResult, check } = require('express-validator')
const app = express();
const cors = require('cors');
app.use(cors());

const port = 3048;

const configureDB = require('./config/db')
//const categoriesCltr = require('./app/controllers/categories-cltr')
const expensesCltr = require('./app/controllers/expenses-cltr')
const idValidationSchema = require('./app/validators/id-schema-validation')
const expenseValidationSchema=require('./app/validators/expense-validation-schema')
//const categoryValidationSchema = require('./app/validators/category-validation-schema')
configureDB()

app.use(express.json())

app.get('/expenses', expensesCltr.list)
app.post('/expenses',checkSchema(expenseValidationSchema), expensesCltr.create)
app.delete('/expenses/:id',checkSchema(idValidationSchema),expensesCltr.remove)
app.put('/expenses/:id',checkSchema(idValidationSchema),checkSchema(expenseValidationSchema), expensesCltr.update)
app.get('/expenses/:id',checkSchema(idValidationSchema), expensesCltr.show)

app.listen (port, () =>{
    console.log('server is running on port', port);
})