import Apply from "../models/applypost.js";
import { validationResult } from "express-validator";
/**
 * applypostCltr - Controller Object for handling operations related to Apply model.
 * 
 * Functions:
 * 
 * 1. list (GET /applyposts)
 *    - Fetches all records from the Apply collection.
 *    - Responds with an array of applypost objects.
 *    - Handles any internal server errors with status 500.
 * 
 * 2. create (POST /applyposts)
 *    - Validates the request body using express-validator.
 *    - If validation fails, responds with 404 and a list of errors.
 *    - If valid, creates a new Apply document in the database.
 *    - Responds with status 201 and the created object.
 *    - Handles internal server errors with status 500.
 * 
 * 3. update (PUT /applyposts/:id)
 *    - Validates the request body.
 *    - If validation fails, responds with 404 and error details.
 *    - Attempts to update an Apply document based on the provided ID.
 *    - If no matching record is found, responds with 400 and an error message.
 *    - On success, responds with the updated applypost object.
 *    - Handles any internal server errors with status 500.
 */

const applypostCltr = {};//This is most likely an object that holds multiple functions related to the "Apply Post" feature/module. For

applypostCltr.list = async (req, res) => {

    try {

        const applypost = await Apply.find()
        res.json(applypost)
    }
    catch (err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong' })
    }
}
applypostCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const body = req.body
    console.log('body', body);
    try {
        const applypost = await Apply.create(body)//applypost is instance of apply model
        res.status(201).json({ applypost })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'something went wrong' })
    }

}

applypostCltr.update = async (req, res) => {//So applypostCltr.update is just one function attached to that controller object.
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    try {
        const applypost = await Apply.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (!applypost) {
            return res.status(404).json({ error: 'record not found' })
        }
        res.json(applypost)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }

}
export default applypostCltr;//This line is used in JavaScript (ES6 modules) to export the applypostCltr object so that it can be used in other files.