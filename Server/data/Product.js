import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [200, "Name is too long"],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    maxlength: [4000, "Description is too long"],
  },
  quantity: {
    type: Number,
    default: 0,
    min: [0, "Quantity cannot be negative"],
  },
  category: {
    type: String,
    required: true,
    maxlength: [200, "Name is too long"],
  },
  image: {
    type: String,
    default: "productDefault.jpg",
    maxlength: [200, "Name is too long"],
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
});
export default mongoose.model("Product", productSchema);
