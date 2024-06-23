import User from "../model/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signinToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signinToken(newUser._id);
  newUser.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("email or passwor missing", 400));
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  user.password = undefined;

  const token = signinToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not loged in! please login", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRECT);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("The user no longer exist", 401));
  }

  req.user = freshUser;

  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError("You do not have permission to do this action", 403));
    }
    next();
  };
};
