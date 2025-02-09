import {Schema, model} from 'mongoose';

const goodSchema=new Schema({
    email:String,
    password:String,
    role: String // Ensure the role field exists
    

},{timestamps:true})
const Good=model('Good', goodSchema)
export default Good;