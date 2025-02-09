// https://nodemailer.com/

const express = require('express')
const {checkSchema} = require('express-validator')
const cors = require('cors'); //npm install cors
const PORT = 3090
const connectDB = require('./config/db')
const contactCntrl = require('./app/controller/contactCntrl')
const contactValidation = require('./app/validator/contactValidator')
const app = express()

// Load environment variables
require('dotenv').config();

connectDB()
app.use(express.json())
app.use(cors());


//routes
app.post('/contact', checkSchema(contactValidation), contactCntrl.submit); // Form submission route
app.get('/contact', checkSchema(contactValidation), contactCntrl.list); // Retrieve all messages (for Postman)

//start server
app.listen(PORT, () =>{
    console.log('Server running on port', PORT)
})