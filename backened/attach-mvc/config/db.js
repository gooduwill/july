import mongoose from 'mongoose'

/**
 * Asynchronously configures and connects to the MongoDB database.
  * @async
 * @function configureDB
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 */
const configureDB = async () => {
    // const dbUrl = 'mongodb://localhost:27017/user-auth'
    try {
        const connect = await mongoose.connect(process.env.DB_URL);
        if (connect) {
            console.log('connected to db');
        }
    } catch (err) {
        console.log(err.message);
    }
}

export default configureDB
