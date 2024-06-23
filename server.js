import app from "./app.js";
import mongoose from "mongoose";

const port = 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error in DB Connection", err);
  });
