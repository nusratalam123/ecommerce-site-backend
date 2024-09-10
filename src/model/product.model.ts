import { ObjectId } from "mongodb";
import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    video: String,
    owner: {
      type: String,
      required: true,
      default: "warehouse",
      enum: ["warehouse", "vendor"],
    },
    vendor: {
      type: ObjectId,
      ref: "Vendor",
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    unit: {
      type: ObjectId,
      ref: "Unit",
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    priceAfterDiscount: Number,
    mrp: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    remainingQuantity: Number,
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],
    code: String,
    qtyAlert: String,
    isVatable: Boolean,
    minStock: Number,
    maxStock: Number,
    isBanner: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save", function (next) {
  if (this.vendor) {
    this.owner = "vendor";
  }

  if (this.discountPercentage) {
    this.priceAfterDiscount =
      this.mrp - this.mrp * (this.discountPercentage / 100);
  }

  this.remainingQuantity = this.qty;
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
