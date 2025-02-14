
import express from "express";
import nodemailer from "nodemailer";

import mongoose from 'mongoose';
import cors from 'cors';
import FormsendValidationSchema from './validators/formsend-validation-schema.js';
import DepartmentValidationSchema from './validators/department-validation-schema.js'
import ProfessorValidationSchema from "./validators/prof-validation-schema.js";
import ReviewValidationSchema from "./validators/review-validation-schema.js";
import User from './models/formsend-model.js';
import formsendCltr from './controllers/formsend-cltr.js';
import { checkSchema, validationResult, body } from 'express-validator';
import dotenv from "dotenv";
import usersCltr from "./controllers/users-cltr.js";

import * as fs from 'fs';

import configureDB from './config/db.js';
import { userRegisterSchema,userLoginSchema } from "./validators/users-validation-schema.js";
import departmentsCltr from "./controllers/department-cltr.js";
import professorCltr from "./controllers/prof-cLtr.js";
import applypostCltr from "./controllers/applypost-cltr.js";

import authenticateUser from "./controllers/middlewares/authenticate.js";
import authorizeUser from "./controllers/middlewares/authorize.js";
import idValidationSchema from "./validators/id-validation-schema.js";
import reviewCltr from "./controllers/review-cltr.js";

dotenv.config();
configureDB()
const app = express();
app.use(cors()); //third party middleware(application+3rd party)
app.use(express.json()); // Parses JSON bodies it is inbuilt middleware(application+inbuilt)
app.use(express.urlencoded({ extended: true }))




//application level middleware
app.use(function(req,res,next){
    console.log(`${new Date()}-${req.method}`)
    next();

})
app.post('/users/register',checkSchema(userRegisterSchema),usersCltr.register)
app.post('/users/login',checkSchema(userLoginSchema),usersCltr.login)
app.get('/users/account',authenticateUser,usersCltr.account)

app.post('/users/department',DepartmentValidationSchema,departmentsCltr.create)
app.get('/users/department',departmentsCltr.list)
app.put('/users/department/:id',departmentsCltr.update)

app.post('/users/prof',authenticateUser,authorizeUser(['admin','professor']),checkSchema(ProfessorValidationSchema),professorCltr.create)
app.get('/users/prof',professorCltr.list)
app.put('/users/prof/:id',professorCltr.update)


app.post('/users/applypost',applypostCltr.create)
app.get('/users/applypost',applypostCltr.list)
app.put('/users/applypost/:id',applypostCltr.update)

app.post('/users/review',reviewCltr.create)
app.get('/users/review',reviewCltr.list)
//app.put('/users/review',reviewCltr.update)







//checkschema routing level middleware
app.post('/formsend1',formsendCltr.create)
app.get('/formsend1',formsendCltr.list)
app.delete('/formsend1/:id',authenticateUser,authorizeUser(['admin']),formsendCltr.remove)
app.put('/formsend1/:id',authenticateUser,authorizeUser(['admin']),formsendCltr.update)

// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});
