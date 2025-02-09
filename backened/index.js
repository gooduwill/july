const express = require('express') 
const mongoose = require('mongoose') // npm install mongoose 
const app = express() 
const PORT = 3010 

mongoose.connect('mongodb://127.0.0.1:27017/expense-app-july24')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })

app.use(express.json())

// category resource 
/*
    1. define a schema - identify properties 
    2. create a model - setup constructor function
    3. setup api - 
    4. perform crud operations
*/
const { Schema, model } = mongoose
const categorySchema = new Schema({
  name: {
    type: String, 
    required: true
  }
}, { timestamps: true })

const Category = model('Category', categorySchema)

app.post('/create-category', (req, res) => {
    const body = req.body 
    const categoryObj = new Category(body)
    categoryObj.save()
        .then((category) => {
            res.status(201).json(category)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})


// expense resource
/*
    1. define a schema - blueprint
    2. create a model - cf
    3. setup api - 
    4. perform crud operations
*/


app.listen(PORT, () => {
    console.log('server running on port', PORT)
})


/*
app.post('/tasks', (req, res) => {
    const body = req.body 
    body.id = Number(new Date())
    tasks.push(body)
    res.json(body)
})

*/