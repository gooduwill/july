import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const reviewSchema = new Schema(
  {
    review: String,
    name3: String,
    rating:String,
    professorId: {type: Schema.Types.ObjectId, required: true, ref: "Professor" }, // Associate review with professor
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);
export default Review;
