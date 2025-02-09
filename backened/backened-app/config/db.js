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