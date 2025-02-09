import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import configureDB from './config/db.js';
import usersCltr from './app/controllers/users-cltr.js';
import { checkSchema } from 'express-validator';
import categoriesCltr from './app/controllers/categories-cltr.js';
import { userRegisterSchema, userLoginSchema } from './app/validators/user-validation-schema.js';
import productCltr from './app/controllers/product-cltr.js';
import enquiriesCltr from './app/controllers/enquiries-cltr.js';
import authenticateUser from './app/middlewares/authenticate.js';
import authorizeUser from './app/middlewares/authorize.js'
import categoryValidationSchema from './app/validators/category-validation-schema.js'
import idValidationSchema from './app/validators/id-validation-schema.js';
import productValidationSchema from './app/validators/product-validation-schema.js';
import enquiryValidationSchema from './app/validators/enquiry-validation-schema.js'


const app =express();
dotenv.config()
configureDB();

//application level middleware
app.use(function(req,res,next){
    console.log(`${new Date()} - ${req.method}- ${req.ip}-${req.url}`)
    next();
})
app.use(express.json());
//express.json()-inbuilt middleware
//application + inbuilt
//cors- third party middleware(application + third party)
//checkschema -routing level middleware
app.use(cors());

app.post('/api/users/register', checkSchema(userRegisterSchema), usersCltr.register)
app.post('/api/users/login',checkSchema(userLoginSchema), usersCltr.login)
app.get('/api/users/account',authenticateUser, usersCltr.account)

app.get('api/categories', categoriesCltr.list)
app.get('/api/categories/:id', checkSchema(idValidationSchema), categoriesCltr.show)
app.post('/api/categories',authenticateUser,authorizeUser(['admin']), checkSchema(categoryValidationSchema), categoriesCltr.create)
app.put('/api/categories/:id',authenticateUser, authorizeUser(['admin']), checkSchema(categoryValidationSchema), checkSchema(idValidationSchema), categoriesCltr.update)
app.delete('/api/categories/:id', authenticateUser, authorizeUser(['admin']),checkSchema(idValidationSchema), categoriesCltr.remove)

app.post('/api/products', authenticateUser,authorizeUser(['seller']), checkSchema(productValidationSchema), productCltr.create)
app.get('/api/products', productCltr.list)
//list of all products/public-return only verified product
app.get('/api/products/my', authenticateUser,authorizeUser(['seller']),productCltr.myList)
//list my products-return only the products added by specific seller
app.get('/api/products/:id', checkSchema(idValidationSchema),productCltr.show)
//show a product/public
//update a product by seller/admin
app.put('/api/products/:id',authenticateUser,authorizeUser(['admin','seller']), checkSchema(productValidationSchema),productCltr.update)

//delete a product by seller/admin
app.delete('/api/products/:id',authenticateUser,authorizeUser(['admin','seller'],checkSchema(idValidationSchema), productCltr.remove))
app.put('/api/products/verify/:id', authenticateUser,authorizeUser(['admin']), productCltr.verify)
//verify product by admin

//buyer, create enquiry
app.post('/api/enquiries', authenticateUser,authorizeUser(['buyer']),checkSchema(enquiryValidationSchema),enquiriesCltr.create)


//list all the enquiries
app.get('/api/enquiries/my',authenticateUser,authorizeUser(['buyer']),enquiriesCltr.myEnquires)

//track an enquiry, show
app.get('/api/enquiries/:id',authenticateUser,authorizeUser(['buyer']),checkSchema(idValidationSchema),enquiriesCltr.show)





//delete an enquiry -only if the response is not given


//edit enquiry - before a response


// seller, get all enquires from a product
app.get('/api/products/:id/enquries',authenticateUser,authorizeUser(['admin','seller']),
checkSchema(idValidationSchema), enquiriesCltr.product)
//response to enquiry
//update the status of an enquiry


//app.get('/api/products/:id/review)

//seller, get all the enquiries for all the products


app.listen(process.env.PORT,()=>{
    console.log('server is running on port',process.env.PORT)
})