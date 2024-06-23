import express from "express";
import {
  login,
  protect,
  restrictTo,
  signup,
} from "../controllers/authControllers.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;
