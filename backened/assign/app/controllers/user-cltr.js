import User from '../models/user-model.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'


const userCltr = {}
 userCltr.contact = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, mobileNo, message } = req.body
            try {
                const user = new User({ name, email, mobileNo, message })
                  console.log(user)
                  await user.save()
                   res.status(201).json(user)
                 }
                    catch (err) {
                       console.log(err)
                        res.status(500).json({ error: 'something went wrong' })

         }
        }
         userCltr.list =async (req,res) => {
          
          try{ 
               const user =  await User.find()
          
              
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: ' k28kjoikk@gmail.com',
                        pass:  'gknpeaqlfqyc2563'
        
                        // Add the password here if needed (not recommended for security reasons)
                    }
                });
                
                const mailOptions = {
                    from: 'k28053341@gmail.com', // Corrected sender email
                    to: 'gooduwill@gmail.com',
                    subject: 'Contact form submission',
                    text: `Email: ${user.email}\nMessage: ${user.message}` // Corrected template literals
                };
        
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send({ message: 'Something went wrong with sending the email.' });
                    }
                    console.log('Email sent successfully:', info.response);
                    res.status(200).json({ users: user, message: 'Email sent successfully.' });
                });
            
          }
              catch(err){
              console.log(err)
              res.status(500).json({error:'something went wrong'})
          }}




export default userCltr