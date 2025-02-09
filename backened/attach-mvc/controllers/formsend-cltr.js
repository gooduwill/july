
import User from '../models/formsend-model.js';
import express from 'express';
import path from 'path';
import * as fs from 'fs';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { validationResult, checkSchema } from 'express-validator';
import FormsendValidationSchema from '../validators/formsend-validation-schema.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const formsendCltr = {};

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, 'uploads');
        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder exists
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Define upload middleware
const upload = multer({ storage: storage });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'p85mount23@gmail.com', // Your email address
        pass: 'uuvmbtqbadxazpkq' // Your email password
    }
});

// Create formsendCltr.create function
formsendCltr.create = [

    upload.fields([
        {name:'attachment', maxCount:1},
        {name:'attachment2', maxCount:1},


    ]), // Add the upload middleware here
    checkSchema(FormsendValidationSchema), // Apply the validation schema here

    async(req, res) => {
        try{        
              
            console.log('Incoming request:', req.body);
            console.log('Incoming request file:', req.file);

        //const {name, instituteName} = req.body;
        // console.log('institueName: ' + instituteName);


        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation Errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        /*const body=req.body;
        const user= User.create(body)
        res.status(201).json(user) */
        const { name,applypost, instituteName, edate, degree,name2,email, department, research, workarea,ResearchExp,id } = req.body;
        const files = req.files;
       // const file2=req.file;
        console.log(req.body);
        const attachmentFile=files.attachment[0];
        const attachment2File=files.attachment2[0];

    
            const user = new User({
            name,applypost, instituteName, edate, degree, name2,email, department, research, workarea,ResearchExp, id, attachments: [{
                data: fs.readFileSync(attachmentFile.path),
               contentType: attachmentFile.mimetype,
                filename: attachmentFile.originalname
            },
            //{
             //   data: fs.readFileSync(file.path),
             //  contentType: file.mimetype,
             //   filename: file.originalname
            //}
             {
                data: fs.readFileSync(attachment2File.path),
               contentType: attachment2File.mimetype,
                filename: attachment2File.originalname
            }]
        })
        user.save()
        res.status(201).json(user);

       


    

        // Check if file is uploaded
        
       /* if (!file) {
            console.log("File not uploaded. Check file input name in frontend.");
            return res.status(400).json({ message: "File not uploaded. Check file input name in frontend." });
        }

        console.log('Uploaded File:', file);*/

        
        //const filePath = path.join(__dirname, 'uploads', files.filename);
        
       
        // Prepare the email with the attachment
           const mailOptions = {
            from: 'p85mount23@gmail.com',

            bcc: email,
            subject: 'Application Form with Attachment',
            text: `A new form has been submitted with the following details:\n\n` +
                `Name: ${name}\n` +
                `Post Applied: ${applypost}\n\n` +
                `Institute: ${instituteName}\n\n` +
                `Highest Degree: ${degree}\n\n` +
                `Prof name: ${name2}\n\n` +
                `Department: ${department}\n\n` +     
                `Research Area: ${research}\n\n` +
                `Work Area: ${workarea}\n\n` +
                `Research Experience: ${ResearchExp}\n\n`,
               // `Attached file: ${file.originalname}`,
            attachments: [
                {
                   filename: attachmentFile.originalname,
                    path: attachmentFile.path // Attach the uploaded file
                },
               // {
                //    filename: file.originalname,
                 //    path: filePath // Attach the uploaded file
                // },
                {
                    filename: attachment2File.originalname,
                     path: attachment2File.path // Attach the uploaded file
                 },
            ]
        
        }
    
    
        // Log email options
        console.log('Email Options:', mailOptions)

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email send error:", error);
                return res.status(500).json({ message: 'Error sending email', error });
            }

            console.log('Email sent successfully:', info.response);
            res.status(200).json({ message: 'Email sent successfully', info });
        });
    }
    catch(error){
        console.error("Unexpected error:", error);
            res.status(500).json({ message: 'Internal server error', error });
    }
}
];


formsendCltr.list = async (req, res) => {

    try {
        const user = await User.find()
        res.status(200).json(user)

    }
    catch {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }
}
formsendCltr.remove = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const id = req.params.id.trim()
    try {

        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(400).json({ error: 'record not found' })

        }
        res.json(user)

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })

    }
}
formsendCltr.update = [
    upload.fields([
        {name:'attachment', maxCount:1},
        {name:'attachment2', maxCount:1},]),
    //upload.single('attachment'), // Add the upload middleware here
    checkSchema(FormsendValidationSchema), // Apply the validation schema here

    async (req, res) => {
        console.log('Incoming request:', req.body);
        console.log('Incoming request file:', req.file);


        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }

        const id = req.params.id;
        const body = req.body;
        const { name,applypost, instituteName, edate, degree,name2,email, department, research, workarea,ResearchExp } = req.body;
        const files = req.files;
        const attachmentFile=files.attachment[0];
        const attachment2File=files.attachment2[0];
        const useruse = new User({
            name,applypost, instituteName, edate, degree,name2,email, department, research, workarea,ResearchExp, id, attachments:[ {
                data: fs.readFileSync(attachmentFile.path),
                contentType: attachmentFile.mimetype,
                filename: attachmentFile.originalname
            },
            {
                data: fs.readFileSync(attachment2File.path),
                contentType: attachment2File.mimetype,
                filename: attachment2File.originalname

            }]
        })
        try {
            const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
            if (!user) {
                return res.status(400).json({ error: 'record not found' })
            }

            res.json(user)
        }
        catch(err) {
            //console.log(err)
            res.status(500).json({ error: 'something went wrong' })
        }
        /*if (!file) {
            console.log("File not uploaded. Check file input name in frontend.");
            return res.status(400).json({ message: "File not uploaded. Check file input name in frontend." });
        }

        console.log('Uploaded File:', file);*/

        //const { name, instituteName } = req.body;
        //const filePath = path.join(__dirname, 'uploads', file.filename);
        
        
            
        // Prepare the email with the attachment
           const mailOptions = {
            from: 'p85mount23@gmail.com',

            bcc: email,
            subject: 'Edited application Form with Attachment',
            text: `A new form has been submitted with the following details:\n\n` +
                `Name: ${name}\n` +
                `Post Applied: ${applypost}\n\n` +
                `Institute: ${instituteName}\n\n` +
                `Highest degree: ${degree}\n\n` +
                `Prof name: ${name2}\n\n` +
                `Department: ${department}\n\n` +     
                `Research Area: ${research}\n\n` +
                `Work Area: ${workarea}\n\n` +
                `Research Experience: ${ResearchExp}\n\n` ,
                //`Attached file: ${file.originalname}`,
                attachments: [
                    {
                       filename: attachmentFile.originalname,
                        path: attachmentFile.path // Attach the uploaded file
                    },
                   // {
                    //    filename: file.originalname,
                     //    path: filePath // Attach the uploaded file
                    // },
                    {
                        filename: attachment2File.originalname,
                         path: attachment2File.path // Attach the uploaded file
                     },
                ]
        };
    
    
   
        // Log email options
        console.log('Email Options:', mailOptions);

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email send error:", error);
                return res.status(500).json({ message: 'Error sending email', error });
            }

            console.log('Email sent successfully:', info.response);
            res.status(200).json({ message: 'Email sent successfully', info });
        });
    }]
export default formsendCltr;


