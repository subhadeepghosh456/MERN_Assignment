import express from "express";
import {
  addProduct,
  editProduct,
  editProductImage,
  getAllProducts,
} from "../controllers/productControllers.js";
import { protect, restrictTo } from "../controllers/authControllers.js";
import { uploadImage } from "../utils/uploadImage.js";

const router = express.Router();

router
  .route("/createProduct")
  .post(
    protect,
    restrictTo("admin"),
    uploadImage.single("productImage"),
    addProduct
  );

router.route("/update/:id").patch(protect, restrictTo("admin"), editProduct);

router
  .route("/updateImage/:id")
  .patch(
    protect,
    restrictTo("admin"),
    uploadImage.single("productImage"),
    editProductImage
  );

router.route("/getAll-products").get(getAllProducts);

export default router;
