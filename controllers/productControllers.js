import Product from "../model/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { v2 as cloudinary } from "cloudinary";

function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}" && obj.constructor === Object;
}

cloudinary.config({
  cloud_name: "daiozdvkp",
  api_key: "311637575492987",
  api_secret: "4NBE5_799ShQtY68D6omGcshrAM",
});

export const addProduct = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  const { file } = req;

  const { secure_url } = await cloudinary.uploader.upload(file.path);
  if (!req.body.productImage) req.body.productImage = secure_url;
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

export const editProduct = catchAsync(async (req, res, next) => {
  //   console.log(req.file);
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new AppError("There is no product associted with this id", 403)
    );
  }

  if (product.user.toString() !== req.user.id) {
    return next(
      new AppError("You dont have permission to perform this operation", 403)
    );
  }
  let updatedProduct;

  updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedProduct,
    },
  });
});

export const editProductImage = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new AppError("There is no product associted with this id", 403)
    );
  }

  if (product.user.toString() !== req.user.id) {
    return next(
      new AppError("You dont have permission to perform this operation", 403)
    );
  }
  //   console.log(req.file);
  if (!req.file) {
    return next(new AppError("No image file exist", 403));
  }
  const { secure_url } = await cloudinary.uploader.upload(req.file.path);
  if (!req.body.productImage) req.body.productImage = secure_url;
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedProduct,
    },
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  let Allproducts;
  // console.log(req.query);
  if (isEmptyObject(req.query) || req.query.category === "all") {
    req.query = {};
  }

  Allproducts = await Product.find(req.query);

  res.status(200).json({
    status: "success",
    data: {
      Allproducts,
    },
  });
});
