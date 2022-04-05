import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// translate to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongo db
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/amazona"
);
//process.env.MONGODB_URL || "mongodb://localhost:27017/amazona"
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready.");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
