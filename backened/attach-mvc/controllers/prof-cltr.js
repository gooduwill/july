import Professor from "../models/prof-model.js";
import ProfessorValidationSchema from "../validators/prof-validation-schema.js";
import { validationResult } from "express-validator";
import { upload } from "../config/cloudinaryConfig.js";


const professorCltr = {};

// Fetches professors based on a specific work area provided in the request parameters.
// - If no professors are found for the given work area, returns a 404 error.
// - Otherwise, returns the list of matching professors.
// - Handles any internal server errors and logs them.
professorCltr.list = async (req, res) => {
  try {
    const { workarea } = req.params;
    const professors = await Professor.find({ workarea });
    if (professors.length === 0) {
      return res.status(404).json({ error: "No professor found" });
    }
    res.json(professors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Retrieves and returns a list of all professors in the database.
// - Sends the entire professor collection as a JSON response.
// - Handles and logs any server-side errors.
professorCltr.show = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.json(professors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Creates a new professor entry with optional image upload.
// - Validates the request using `express-validator`.
// - Accepts professor details (`name2`, `area`, `email`, `workarea`) from the request body.
// - If an image is uploaded, stores the Cloudinary path in the DB.
// - Returns the newly created professor object on success.
// - Handles validation errors and server exceptions.
professorCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name2, area, email, workarea } = req.body;
    const image = req.file ? req.file.path : null; // Get Cloudinary URL
    console.log(name2, area, email, workarea, image)

    const professor = await Professor.create({ name2, area, email, workarea, image });
    res.status(201).json({ professor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Updates an existing professor entry by ID with optional image update.
// - Validates the request body.
// - Retrieves the professor ID from request parameters.
// - Updates fields (`name2`, `area`, `email`, `workarea`) and image (if present).
// - Uses `findOneAndUpdate` with `{ new: true }` to return the updated document.
// - Returns a 404 if the professor doesn't exist.
// - Handles validation and server-side errors.

professorCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name2, area, email, workarea } = req.body;

    const image = req.file ? req.file.path : null;

    const updateData = { name2, area, email, workarea };
    if (image) updateData.image = image;

    const professor = await Professor.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!professor) {
      return res.status(404).json({ error: "Record not found" });
    }

    //console.log("After update:", professor);
    res.json(professor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export default professorCltr;
