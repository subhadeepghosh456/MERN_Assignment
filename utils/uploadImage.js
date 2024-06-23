import multer from "multer";

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  // console.log(file);
  if (!file.mimetype.startsWith("image")) {
    cb("Only image file supported", false);
  }
  cb(null, true);
};

export const uploadImage = multer({ storage, fileFilter });
