import mongoose from 'mongoose';
 
const {Schema, model}=mongoose
const userSchema = new Schema({
    name: String,
    applypost:String,
    instituteName: String,
    edate:{
        type:Date,
        required:true,
        validate: {
            validator: function (value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value <= today;
            },
            message: 'edate must be today or a past date.',
        },
    },
    degree:String,
    name2:String,
    email:String,
    department:String,
    research:String,
    workarea:String,
    ResearchExp:String,
        attachment: {
            data: Buffer,
            contentType: String,
            filename: String,
        },
        attachment2: {
            data: Buffer,
            contentType: String,
            filename: String,
        },
        
})
const User=model('user', userSchema)
export default User;