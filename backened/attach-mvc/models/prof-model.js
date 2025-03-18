import {Schema, model} from 'mongoose';

const professorSchema=new Schema({
    name2:String,
    area:String,
    email:String,
    image:String,
    workarea:String,

    
    
    

},{timestamps:true})
const Professor=model('Professor', professorSchema)
export default Professor;