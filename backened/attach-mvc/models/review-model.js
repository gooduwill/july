import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const reviewSchema = new Schema(
  {
    review: String,
    name3: String,
    professorId: {type: String, required:true }, // Associate review with professor
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);
export default Review;
