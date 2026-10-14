import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: [100, "Username is too long"],
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: String,
    email: {
        type: String,
        maxlength: [254, "Email is too long"],
        unique: true,
    },
    roles: {
        type: [String], // (User, ShopOwner, Admin)
        enum: ["User", "ShopOwner", "Admin", "Deliverer"],
        default: ["User"],
    },
    image: {
        type: String,
        default: "default.jpg",
    },
    theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
    },

    language: {
        type: String,
        enum: ["en", "ar"],
        default: "en",
    },
    preferredShop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
    },
    preferredProducts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    preferredCategories: [
        {
            type: String,
            enum: [
                "grocery",
                "electronics",
                "clothing",
                "restaurant",
                "pharmacy",
                "other",
            ],
        },
    ],

    // Specific fields for Deliverer
    deliveryInfo: {
        vehicleType: {
            type: String,
            enum: ["bike", "motorcycle", "car", "tuk-tuk"],
        },

        isAvailable: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating must be at most 5"],
        },
        averageDeliveryTime: {
            type: Number, // in minutes
            min: [0, "Average delivery time cannot be negative"],
            max: [99999, "Average delivery time cannot exceed 99999 minutes"],
        },
    },
});

export default mongoose.model("User", userSchema);
