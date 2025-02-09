import mongoose, {Schema, model} from 'mongoose';
const researchSchema = new Schema({
    topic: {
      type: String,
      required: true,
    },
    workarea: {
      type: [String], // Array of workareas (meta, dgs, slot, graphene, etc.)
      required: true,
    }
  });
  
  const departmentSchema = new Schema({
    stream: {
      type: String,
      required: true,
    
    },
    research: {
      type: [researchSchema],
      required: true,
    }
  });
  

/*const departmentSchema=new Schema({
    department:String      

},{timestamps:true})
const Department=model('Department', departmentSchema)
export default Department;*/

/*const departmentSchema=new Schema({
    stream:{
        type:String,
        required:true,
        unique:true,
    },
    research:{
        type:[String],
    
        required:true,
    },

})*/
    
   // const Department=model('Department', departmentSchema)

const Department=mongoose.model('Department', departmentSchema)

export default Department;