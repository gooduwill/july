import Professor from "../models/prof-model.js";
import ProfessorValidationSchema from "../validators/prof-validation-schema.js";
import { validationResult } from "express-validator";
import { upload } from "../config/cloudinaryConfig.js";


const professorCltr = {};

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

// Fetch all professors
/*professorCltr.list = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.json(professors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}; */

// Create a professor with an image upload
professorCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name2, area, email, workarea } = req.body;
    const image = req.file ? req.file.path : null; // Get Cloudinary URL
    console.log(name2,area,email,workarea,image)

    const professor = await Professor.create({ name2, area, email,workarea, image });
    res.status(201).json({ professor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a professor with image
/*professorCltr.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name2, area, email } = req.body;
    const image = req.file ? req.file.path : null; // Get Cloudinary URL

    const updateData = { name2, area, email };
    if (image) updateData.image = image; // Update image only if a new one is provided
    const bprofessor = await Professor.findById(req.params.id);
    console.log("Before update:", bprofessor); // Debugging
    //const professor = await Professor.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).lean();
    const professor = await Professor.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );
    console.log("After update:", Professor); // Debugging

    if (!professor) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(professor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};  */
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

    console.log("Update Data:", updateData);
    console.log("Updating professor with ID:", req.params.id);

    const professor = await Professor.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!professor) {
      return res.status(404).json({ error: "Record not found" });
    }

    console.log("After update:", professor);
    res.json(professor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export default professorCltr;
