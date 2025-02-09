const express = require('express');
const { checkSchema, validationResult } = require('express-validator')
const app = express();

const port = 3012;

const configureDB = require('./config/db')
//const categoriesCltr = require('./app/controllers/categories-cltr')
const expensesCltr = require('./app/controllers/expenses-cltr')
const idValidationSchema = require('./app/validators/id-schema-validation')
const expenseValidationSchema=require('./app/validators/expense-validation-schema')
//const categoryValidationSchema = require('./app/validators/category-validation-schema')
configureDB()

app.use(express.json())
/*
app.get('/categories', categoriesCltr.list)
app.get('/categories/:id', checkSchema(idValidationSchema), categoriesCltr.show)
app.post('/categories', checkSchema(categoryValidationSchema), categoriesCltr.create)
app.put('/categories/:id', checkSchema(categoryValidationSchema), checkSchema(idValidationSchema), categoriesCltr.update)
app.delete('/categories/:id', checkSchema(idValidationSchema), categoriesCltr.remove)*/

app.get('/expenses', expensesCltr.list)
app.post('/expenses', expensesCltr.create)
app.delete('/expenses/:id',checkSchema(idValidationSchema),expensesCltr.remove)
app.put('/expenses/:id',checkSchema(idValidationSchema),expensesCltr.update)
app.get('/expenses/:id',checkSchema(idValidationSchema), expensesCltr.show)

app.listen (port, () =>{
    console.log('server is running on port', port);
})