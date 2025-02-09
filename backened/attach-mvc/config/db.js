/*import mongoose from 'mongoose';

const configDB=()=>{
mongoose.connect('mongodb://127.0.0.1:27017/formsend-app-july24')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })
}
//module.exports=configDB
export default configDB;*/
import mongoose from 'mongoose'

const configureDB = async () => {
    // const dbUrl = 'mongodb://localhost:27017/user-auth'
    try {
        const db = await mongoose.connect(process.env.DB_URL)
        console.log('connected to db')        
    }catch(err) {
        console.log(err)
    }
}

export default configureDB
