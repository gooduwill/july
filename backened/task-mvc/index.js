const express = require('express');
const { checkSchema, validationResult, check } = require('express-validator')
const app = express();
const cors =require('cors')

const port = 3029;

const configureDB = require('./config/db')
//const categoriesCltr = require('./app/controllers/categories-cltr')
const taskCltr = require('./app/controllers/task-cltr')
const idValidationSchema = require('./app/validators/id-schema-validation')
const TaskValidationSchema=require('./app/validators/task-validation-schema')
//const categoryValidationSchema = require('./app/validators/category-validation-schema')
configureDB()

app.use(express.json())
app.use(cors())


app.get('/task', taskCltr.list)
app.post('/task',checkSchema(TaskValidationSchema), taskCltr.create)
app.put('/task/:id',checkSchema(idValidationSchema),checkSchema(TaskValidationSchema), taskCltr.update)
app.delete('/task/:id',checkSchema(idValidationSchema),taskCltr.remove)

app.get('/task/:id',checkSchema(idValidationSchema), taskCltr.show)

app.listen (port, () =>{
    console.log('server is running on port', port);
})