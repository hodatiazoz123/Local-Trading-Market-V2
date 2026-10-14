import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { Schema } = mongoose;

const orderSchema = new Schema({
  // Order
  // ├── customer
  // ├── items
  // ├── totalPrice
  // ├── deliveryAddress => for when user changes it.
  // ├── status
  // └── createdAt
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
    maxlength: [300, "Phone number is too long"],
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Order", orderSchema);
