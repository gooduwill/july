import express from "express";
import cors from 'cors';
import routes from "./config/routes.js";
import dotenv from "dotenv";
import configureDB from './config/db.js';

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
app.use("/api",routes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});
