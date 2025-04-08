
import Review from "../models/review-model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

const reviewCltr = {};

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
