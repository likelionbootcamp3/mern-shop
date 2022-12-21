import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoute from "./routes/product.route";

const port = 4000;
const uri = process.env.MONGO_URI;

// Create server
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/products", productRoute);
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

// Run db and server
mongoose.set("strictQuery", false);
mongoose.connect(uri).then(() => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
