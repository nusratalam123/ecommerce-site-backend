import mongoose from "mongoose";
import validator from "validator";

const bookSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    country: {
      type: Number,
      required: false,
    },
    payment: {
      type: String,
      required: [true, "color is required"],
    },
    },
  {
    timestamps: true,
  },
);


const Book = mongoose.model("Book", bookSchema);
export default Book;
