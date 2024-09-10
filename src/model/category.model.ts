import mongoose, { model,Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a category name"],
      maxLength: 100,
      unique: true,
    },
    img: String,
    subCategory: {
      type: ObjectId,
      ref: "SubCategory",
    },
  },
  {
    timestamps: true,
  },
);

const Category = model("Category", categorySchema);

export default Category;
