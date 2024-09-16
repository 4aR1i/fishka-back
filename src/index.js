import express, { json } from "express";
import "dotenv/config";
import { connect } from "mongoose";
import authRouter from "./routes/auth.js";

const app = express();
app.use(json());
app.use("/auth", authRouter);

connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
