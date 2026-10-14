import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { Schema } = mongoose;

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [100, "Name is too long"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buisinessEmail: {
    type: String,
    maxlength: [254, "Email is too long"],
  },
  image: {
    type: String,
    default: "shopDefault.jpg",
  },

  phone: {
    type: String,
    required: true,
    maxlength: [30, "Phone number is too long"],
  },
  address: {
    type: String,
    required: true,
    maxlength: [300, "Address is too long"],
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  deliveryAvailable: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
    maxlength: [200, "Category is too long"],
    enum: [
      "grocery",
      "electronics",
      "clothing",
      "restaurant",
      "pharmacy",
      "other",
    ],
  },
});
