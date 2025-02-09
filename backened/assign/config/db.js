import mongoose from 'mongoose'
const configureDB=async()=>{

    const dbUrl='mongodb://localhost:27017/assign'
try{
    const db=await mongoose.connect(dbUrl)
    console.log('connected to db')
} catch(err){
    console.log(err)

}


}
export default configureDB