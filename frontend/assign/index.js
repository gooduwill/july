const express = require('express')
const port = 3033
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var cors = require('cors')
app.use(cors())
const nodemailer=require('nodemailer')

mongoose.connect('mongodb://127.0.0.1:27017/form-app-july24')
    .then(() => {
        console.log('connected to db')
    })
        .catch((err) => {
        console.log('error connecting to db', err)
    })

    const User = mongoose.model('User', {
    name: String,
    email: String,
    mobileNo: Number,
    message: String
})
app.get('/api/contact',async(req,res)=>{
    try{
        const user = await User.find();
        console.log(user);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: ' k28053341@gmail.com',
                pass:  'gknpeaqlfqycjukm'

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
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});
//const{email,password}=req.body
//res.send({message:'login successful'})



app.post('/api/contact', async (req, res) => {
    //const body=req.body
    //console.log(body)
    //const{email,Password}=req.body
    //console.log(email,Password)
    /* if(email=='goodyouwill@gmail.com' && Password=='good123'){
        res.send({message:'Login successful'})}
        else{
            res.status(401).send({message:'invalid credentials'})
        
        }*/
    const { name, email, mobileNo, message } = req.body
        try {
        const user = new User({ name, email, mobileNo, message })
        console.log("User" + user)
        //const salt =await bcryptjs.genSalt()
        //const hash=await bcryptjs.hash(password,salt)
        //user.password=hash
        await user.save()
        res.status(200).json(user)
      /*  const transporter=nodemailer.createTransport({
            host:('link unavailabe'),
            port:3033,
            secure:false,
            auth:{
                user:'goodyouwill@gmail.com',
                pass:'Good@12345'
            }

        })
        const mailOptions={
            from:email,
            to:'gooduwill@gmail.com',
            subject:'contact fom submission',
            text:'email:${email}\nmessage:${message}'

        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
                res.status(500).send({message:'something went wrong'})

            }
                else{
                    console.log('email sent successfully')
                    res.send({message:'email sent successfully'})
                }

        })
        */
    }
            catch (err) {
            console.log(err)
            res.status(500).json({ error: 'something went wrong' })

    }

    /* try{
       const user=await User.create(body)
       console.log(user)
       
           res.status(201).json(user)
   
   }
   catch{
       console.log(err)  
       res.status(400).json({error:error.message})
   }*/
})
            app.listen(3033, () => {
            console.log('server startes on port', port)
})