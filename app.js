import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors("*"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
});

export default app;
