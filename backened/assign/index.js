import express from 'express'
//const express=require('express')
import configureDB from './config/db.js'
import userCltr from './app/controllers/user-cltr.js'
import { userContactSchema } from './app/validation/user-validation-schema.js'
import {checkSchema} from 'express-validator' 
import dotenv from 'dotenv'
dotenv.config()
//var cors=require('cors')
import cors from 'cors';
const app=express()

app.use(cors());

//const app=express()
app.use(express.json())
configureDB()
const port=3052


app.post('/contact',checkSchema(userContactSchema),userCltr.contact)
app.get('/contact',userCltr.list)

app.listen(port,()=>{
console.log('server is running on port',port)
})
