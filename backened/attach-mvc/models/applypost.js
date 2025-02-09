import {Schema, model} from 'mongoose';

const applySchema=new Schema({
    applypost:String,
    

},{timestamps:true})
const Apply=model('Apply', applySchema)
export default Apply;