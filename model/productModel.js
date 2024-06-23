import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Product Owner required"],
    },
    description: {
      type: String,
      required: [true, "A Product description is must needed"],
    },
    category: {
      type: String,
      required: [true, "A product category is must needed"],
      lowercase: true,
    },
    productImage: {
      type: String,
      required: [true, "A product image is must needed"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
