import mongoose from "mongoose";
import validator from "validator";

const carSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    brandModel: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    seatNumber: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: [true, "color is required"],
    },
    condition: {
      type: String,
    },
    price: {
      type: String,
      required: [true, "price is required"],
    },
    registration: {
      type: String,
      required: [true, "registration is required"],
    },
    sellerName: {
      type: String,
    },
    sellerPhone: {
      type: String,
      required: [true, "Phone number must be is required"],
    },
    sellerCountry: {
      type: String,
      required: [true, "Country must be is required"],
    },
    sellerImg: {
      type: String,
    },
    nid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// comparePassword


const CarPost = mongoose.model("CarPost", carSchema);
export default CarPost;
