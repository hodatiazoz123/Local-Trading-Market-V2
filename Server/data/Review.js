import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must be at most 5"],
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
  comment: {
    type: String,
    maxlength: [1000, "Comment is too long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Review", reviewSchema);
