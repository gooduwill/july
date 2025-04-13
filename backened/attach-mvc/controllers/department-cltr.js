import Department from "../models/department-model.js"
import { validationResult } from "express-validator";
/**
 * departmentsCltr - Controller object for managing operations related to departments.
 *
 * Functions:
 *
 * 1. list (GET /departments)
 *    - Retrieves and returns a list of all departments from the database.
 *    - Responds with an array of department objects.
 *    - Handles internal server errors with status 500 and an error message.
 *
 * 2. create (POST /departments)
 *    - Validates the incoming request body using express-validator.
 *    - If validation fails, responds with status 404 and an array of validation errors.
 *    - If validation passes, creates a new department document in the database.
 *    - Responds with status 201 and the newly created department object.
 *    - Handles any errors during creation with status 500 and a generic error message.
 *
 * 3. update (PUT /departments/:id)
 *    - Validates the incoming request body.
 *    - If validation fails, responds with status 404 and validation error details.
 *    - Attempts to update a department by its ID with the provided data.
 *    - If no matching department is found, responds with status 400 and a "record not found" message.
 *    - On success, returns the updated department object.
 *    - Handles internal server errors with status 500 and an error message.
 *
 */

const departmentsCltr = {}

departmentsCltr.list = async (req, res) => {

    try {

        const departments = await Department.find()
        res.json(departments)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }
}
departmentsCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const body = req.body
    console.log('body', body);
    try {
        const department = await Department.create(body)
        res.status(201).json({ department })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'something went wrong' })
    }

}

departmentsCltr.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    try {
        const department = await Department.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (!department) {
            return res.status(400).json({ error: 'record not found' })

        }
        res.json(department)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }

}
export default departmentsCltr;
