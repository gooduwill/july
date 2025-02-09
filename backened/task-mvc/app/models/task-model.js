const mongoose=require('mongoose')
const{Schema,model}=mongoose
const TaskSchema = new Schema
({
    title: {
       type: String,
       required: true
    },
    description: {
       type: String,
       required: true
    },
    status: {
       type: String,
       default:"pending"
    }
}, { timestamps: true })

const Task = model('task', TaskSchema)
module.exports = Task