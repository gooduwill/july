
import Review from "../models/review-model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

const reviewCltr = {};

// Creates a new review for a professor.
// - Validates the request using express-validator.
// - Expects `review`, `name3`, `rating`, and `professorId` in the request body.
// - Returns a 400 error if professorId is missing.
// - On success, saves the review to the database and returns it with a 201 status.
// - Catches and logs any server errors and returns a 500 status code.
reviewCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  const { review, name3, rating, professorId } = req.body;

  if (!professorId) {
    return res.status(400).json({ error: "Professor ID is required" });
  }

  try {
    const newReview = await Review.create({
      review, name3, rating, professorId
    });
    res.status(201).json(newReview);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Retrieves all reviews associated with a specific professor.
// - Expects `professorId` in the query parameters.
// - Returns a 400 error if professorId is missing or invalid.
// - Queries the Review model for all reviews linked to the given professor ID.
// - Responds with the list of reviews if successful.
// - Handles and logs any internal server errors.
reviewCltr.list = async (req, res) => {
  try {
    const { professorId } = req.query;
    if (!professorId) {
      return res.status(400).json({ error: "Professor ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(professorId)) {
      return res.status(400).json({ error: "Invalid Professor ID" });
    }

    const query = { professorId: new mongoose.Types.ObjectId(professorId) };
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default reviewCltr;
