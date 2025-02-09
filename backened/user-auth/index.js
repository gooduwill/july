import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { checkSchema } from 'express-validator'
import configureDB from './config/db.js'
import usersCltr from './app/controllers/users-cltr.js'
//import { userRegisterSchema, userLoginSchema } from './app/validatons/user-validation-schema.js'
import { userRegisterSchema,userLoginSchema } from './app/validations/user-validation-schema.js'
import authenticateUser from './app/middlewares/authentication.js'
const app = express()
const port = 3085
app.use(express.json())
configureDB()

app.get('/home', (req,res) => {
    res.json({
        message: 'home page'
    })
})

app.post('/register', checkSchema(userRegisterSchema), usersCltr.register)
app.post('/login', checkSchema(userLoginSchema), usersCltr.login)
app.get('/profile', authenticateUser, usersCltr.profile)

app.listen(port, () => {
    console.log('server running on port', port)
})
